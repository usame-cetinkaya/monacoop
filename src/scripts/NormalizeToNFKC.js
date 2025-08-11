/**
    {
        "api":1,
        "name":"Normalize to NFKC",
        "description":"Normalizes the text to NFKC (Normalization Form KC)",
        "icon":"normalize",
        "tags":"normalize,nfkc,unicode"
    }
**/

export function main(state) {
  try {
    state.text = state.text.normalize("NFKC");
  } catch (error) {
    state.postError(
      error.message || "An error occurred while normalizing the text.",
    );
  }
}
