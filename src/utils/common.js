import { IMAGES } from "../assets/images"

export const checkActionName = (actionName) => { 

    if (actionName) {
        switch (actionName) {
            case 'Reel':
            return IMAGES.reel
            case 'TikTok':
            return IMAGES.tiktok
            case 'Story':
            return IMAGES.instagramStory
            case 'Maps & Story':
            return IMAGES.googleMaps
            case 'Diary Instagram':
            return IMAGES.diary
        }
    }
}