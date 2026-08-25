#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {StreamChat} = require('stream-chat');

const DEFAULT_BATCH_SIZE = 100;

const args = process.argv.slice(2);
const inputPath = args.find(arg => !arg.startsWith('--'));
const isDryRun = args.includes('--dry-run');

const getArgValue = name => {
  const arg = args.find(item => item.startsWith(`${name}=`));
  return arg ? arg.slice(name.length + 1) : undefined;
};

const batchSize = Number(getArgValue('--batch-size') || DEFAULT_BATCH_SIZE);

const usage = () => {
  console.log(`
Usage:
  STREAM_CHAT_API_KEY=... STREAM_CHAT_SECRET=... node scripts/upsert-stream-users.js <users-json-path> [--dry-run] [--batch-size=100]

Input JSON shape:
  {
    "users": [{ "id": 123, "name": "Influencer Name", "image": "https://..." }],
    "owners": [{ "id": 456, "name": "Owner Name", "image": "https://..." }]
  }
`);
};

if (!inputPath) {
  usage();
  process.exit(1);
}

if (!Number.isInteger(batchSize) || batchSize <= 0) {
  console.error('Invalid --batch-size. Use a positive integer.');
  process.exit(1);
}

const apiKey = process.env.STREAM_CHAT_API_KEY;
const apiSecret = process.env.STREAM_CHAT_SECRET;

if (!isDryRun && (!apiKey || !apiSecret)) {
  console.error(
    'Missing STREAM_CHAT_API_KEY or STREAM_CHAT_SECRET env variable.',
  );
  process.exit(1);
}

const readInput = filePath => {
  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf8');
  return JSON.parse(raw);
};

const normalizeName = (name, fallbackName) => {
  const normalizedName = String(name || '').trim();
  return normalizedName || fallbackName;
};

const createStreamUser = (user, prefix, fallbackLabel) => {
  if (user?.id === null || user?.id === undefined || user?.id === '') {
    return null;
  }

  const numericId = String(user.id).trim();
  const streamUser = {
    id: `${prefix}_${numericId}`,
    name: normalizeName(user.name, `${fallbackLabel} ${numericId}`),
  };

  if (user.image) {
    streamUser.image = user.image;
  }

  return streamUser;
};

const uniqueById = users => {
  const byId = new Map();

  users.forEach(user => {
    if (user?.id) {
      byId.set(user.id, user);
    }
  });

  return Array.from(byId.values());
};

const chunk = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const main = async () => {
  const data = readInput(inputPath);
  const influencers = (data.users || [])
    .map(user => createStreamUser(user, 'influencer', 'Influencer'))
    .filter(Boolean);
  const owners = (data.owners || [])
    .map(owner => createStreamUser(owner, 'owner', 'Owner'))
    .filter(Boolean);
  const streamUsers = uniqueById([...influencers, ...owners]);

  console.log(
    `Prepared ${streamUsers.length} Stream users (${influencers.length} influencers, ${owners.length} owners).`,
  );

  if (isDryRun) {
    console.log('Dry run enabled. First 10 users:');
    console.log(JSON.stringify(streamUsers.slice(0, 10), null, 2));
    return;
  }

  const client = StreamChat.getInstance(apiKey, apiSecret);
  const batches = chunk(streamUsers, batchSize);
  let upsertedCount = 0;

  for (const [batchIndex, batch] of batches.entries()) {
    await client.upsertUsers(batch);
    upsertedCount += batch.length;
    console.log(
      `Upserted batch ${batchIndex + 1}/${batches.length} (${upsertedCount}/${streamUsers.length}).`,
    );
  }

  console.log(`Done. Upserted ${upsertedCount} users into Stream.`);
};

main().catch(error => {
  console.error('Failed to upsert Stream users:');
  console.error(error?.response?.data || error?.message || error);
  process.exit(1);
});
