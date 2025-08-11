/**
    {
        "api":1,
        "name":"Trim and Join Lines",
        "description":"Trims whitespace from the beginning and end of each line in the selected text, and joins the lines into a single line.",
        "author":"Üsame",
        "icon":"scissors",
        "tags":"trim,lines",
        "bias":1.0
	}
**/

export function main(state) {
  try {
    state.text = state.text
      .split("\n")
      .map((line) => line.trim())
      .join("");
  } catch (error) {
    state.postError("Explain what went wrong here...");
  }
}
