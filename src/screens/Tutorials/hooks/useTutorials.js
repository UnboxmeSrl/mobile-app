import {useEffect, useState} from 'react';
import {getTutorialsList} from '../../../services';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAMES} from '../../../constants';

const useTutorials = () => {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [tutorialsList, setTutorialsList] = useState([]);
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('tHo19-gmQpA');
  const navigation = useNavigation();

  const getTutorialsListData = async () => {
    const res = await getTutorialsList();
    setTutorialsList(res);
    setLoading(false);
  };

  const handleRedirect = particularVideoId => {
    setVideoId(particularVideoId);
    setIsYoutubeModalOpen(true);

    // if (targetUrl) {
    //   Linking.openURL(targetUrl);
    // }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getTutorialsListData();
  }, []);

  return {
    loading,
    tutorialsList,
    isYoutubeModalOpen,
    videoId,
    playing,
    setIsYoutubeModalOpen,
    handleRedirect,
    handleBackPress,
  };
};

export default useTutorials;
