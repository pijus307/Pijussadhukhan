import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
  const inputFile = 'file:///C:/Users/pijus/.gemini/antigravity/brain/39f54504-7936-4b04-a2ec-df74c2ada012/media__1773677769229.jpg';
  const outputFile = 'src/assets/profile.png';
  
  console.log('Starting background removal...');
  try {
    const blob = await removeBackground(inputFile);
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(outputFile, buffer);
    console.log('Background removed successfully! Saved to ' + outputFile);
  } catch (err) {
    console.error('Error removing background:', err);
  }
}

run();
