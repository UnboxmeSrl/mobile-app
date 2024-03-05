import { IMAGES } from '../assets/images'

export const checkActionName = (actionName) => {
  if (actionName) {
    switch (actionName) {
      case 'Reel':
        return IMAGES.reelsAddNew
      case 'TikTok':
        return IMAGES.tiktokAddNew
      case 'Story':
        return IMAGES.storyAddNew
      case 'Maps & Story':
        return IMAGES.googleMaps
      case 'Diary Instagram':
        return IMAGES.diary
      case 'Diary Tiktok':
        return IMAGES.diary
    }
  }
}

export const checkContentStatus = (statusName) => {
  let title = '',
    description = '',
    statusIcon = ''

  switch (statusName) {
    case 'Approved':
      statusIcon = IMAGES.approvalSuccess
      title = 'Your content has been approved!'
      description = 'Congratulations your content created at Pizzami has been approved!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Rejected':
      statusIcon = IMAGES.approvalReject
      title = 'Your content has been rejected!'
      description = 'You lost some Exp, recover it by sending the content on review'
      return {
        title,
        description,
        statusIcon,
      }
    case 'To publish':
      statusIcon = IMAGES.approvalPending
      title = 'Your content need to be published!'
      description = 'Your content needs to be published!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Under Review':
      statusIcon = IMAGES.approvalUnderReview
      title = 'Your content in under review!'
      description = 'Your content is under review. We are checking it, you will be notified once approved!'
      return {
        title,
        description,
        statusIcon,
      }
    case 'Missed Deadline':
      statusIcon = IMAGES.approvalMissed
      title = 'You have missed the deadline!'
      description =
        'You have missed the Deadline and lost some Exp points. Publish now to not comprise your stats and to not get the account frozen'

      return {
        title,
        description,
        statusIcon,
      }
  }
}
