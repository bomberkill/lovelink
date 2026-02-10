import { LovePage } from './types';
import ImpossibleToSayNo from '@/components/experiences/ImpossibleToSayNo';
import LiveStory from '@/components/experiences/LiveStory';

/**
 * Map experience type to the corresponding component
 */
export function getExperienceComponent(lovePage: LovePage) {
    switch (lovePage.experience) {
        case 'impossible-to-say-no':
            return ImpossibleToSayNo;
        case 'timeline':
            return LiveStory;
        default:
            return null;
    }
}
