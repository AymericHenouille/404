import { readable, type Readable } from 'svelte/store';
import forestTop from '../../assets/images/forest-top.jpg';
import forest from '../../assets/images/forest.jpg';
import lacLarge from '../../assets/images/lac-large.jpg';
import lacSmall from '../../assets/images/lac-small.jpg';
import lac from '../../assets/images/lac.jpg';
import mountain from '../../assets/images/mountain.jpg';

const images: string[] = [forestTop, forest, lacLarge, lacSmall, lac, mountain];

function selectAnImage(): string {
  const value: number = Math.random() * images.length;
  const index: number = Math.floor(value);
  return images[index];
}

export const background: Readable<string> = readable(images[0], (set) => {
  const updateImage: Function = () => {
    const image: string = selectAnImage();
    set(image);
  };
  const interval: number = setInterval(updateImage, 10000); 
  updateImage();
  return () => clearInterval(interval);
});