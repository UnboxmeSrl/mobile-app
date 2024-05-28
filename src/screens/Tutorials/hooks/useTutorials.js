import {useEffect, useState} from 'react';
import {getTutorialsList} from '../../../services';
import {Linking} from 'react-native';

const useTutorials = () => {
  const [loading, setLoading] = useState(true);
  const [tutorialsList, setTutorialsList] = useState([]);

  const getTutorialsListData = async () => {
    const res = await getTutorialsList();
    setTutorialsList(res);
    setLoading(false);
  };

  const handleRedirect = targetUrl => {
    if (targetUrl) {
      Linking.openURL(targetUrl);
    }
  };

  useEffect(() => {
    getTutorialsListData();
  }, []);

  return {
    loading,
    tutorialsList,
    handleRedirect,
  };
};

export default useTutorials;
