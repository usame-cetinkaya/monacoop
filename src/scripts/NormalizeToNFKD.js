/**
    {
        "api":1,
        "name":"Normalize to NFKD",
        "description":"Normalizes the text to NFKD (Normalization Form KD)",
        "icon":"normalize",
        "tags":"normalize,nfkd,unicode"
    }
**/

export function main(state) {
  try {
    state.text = state.text.normalize("NFKD");
  } catch (error) {
    state.postError(
      error.message || "An error occurred while normalizing the text.",
    );
  }
}
