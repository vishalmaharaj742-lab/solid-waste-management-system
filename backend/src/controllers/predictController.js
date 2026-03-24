const Jimp = require("jimp");

const classifyFromMean = (mean) => {
  const [r, g, b] = mean;
  let label = "Dry";
  if (g > 0.45 && r > 0.35) {
    label = "Wet";
  } else if (b > 0.45 && g < 0.35) {
    label = "Plastic";
  } else if (r > 0.5 && g > 0.5 && b > 0.5) {
    label = "Metal";
  }

  const scores = {
    Dry: 0.1,
    Wet: 0.1,
    Plastic: 0.1,
    Metal: 0.1
  };
  scores[label] = 0.7;

  return {
    label,
    confidence: scores[label],
    scores,
    mode: "heuristic"
  };
};

const predictWasteType = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const image = await Jimp.read(req.file.buffer);
    image.resize(64, 64);

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      r += image.bitmap.data[idx];
      g += image.bitmap.data[idx + 1];
      b += image.bitmap.data[idx + 2];
      count += 1;
    });

    const mean = [r / count / 255, g / count / 255, b / count / 255];
    const result = classifyFromMean(mean);
    res.json(result);
  } catch (error) {
    console.error("Prediction failed:", error.message);
    res.status(500).json({ message: "Prediction failed" });
  }
};

module.exports = { predictWasteType };
