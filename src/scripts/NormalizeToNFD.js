/**
    {
        "api": 1,
        "name": "Normalize to NFD",
        "description": "Normalizes the text to NFD (Normalization Form D)",
        "icon": "normalize",
        "tags": "normalize,nfd,unicode"
    }
**/
export function main(state) {
  try {
    state.text = state.text.normalize("NFD");
  } catch (error) {
    state.postError(
      error.message || "An error occurred while normalizing the text.",
    );
  }
}
