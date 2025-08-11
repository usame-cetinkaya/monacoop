/**
    {
        "api": 1,
        "name": "Normalize to NFC",
        "description": "Normalizes the text to NFC (Normalization Form C)",
        "icon": "normalize",
        "tags": "normalize,nfc,unicode"
    }
**/

export function main(state) {
  try {
    state.text = state.text.normalize("NFC");
  } catch (error) {
    state.postError(
      error.message || "An error occurred while normalizing the text.",
    );
  }
}
