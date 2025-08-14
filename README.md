# React Boop

Port of [Ray Boop](https://github.com/raycast/extensions/tree/7f9c1daa7d7bfd080292fd576d5a27ce439f06ba/extensions/ray-boop) to React, which is a port of [Boop](https://github.com/IvanMathy/Boop/) to Raycast, which is a scriptable scratchpad for developers.

Uses [Monaco React](https://github.com/suren-atoyan/monaco-react) for the script editor, and supports syntax highlighting for multiple languages.

Language, theme, editor data and custom scripts are auto-saved to local storage.

## Keyboard Shortcuts
| Shortcut | Description                                    |
|----------|------------------------------------------------|
| ⌘ K      | Open script selector                           |
| ⌘ L      | Open language selector for syntax highlighting |
| ⌘ J      | Open theme selector                            |

## Custom Script
| Button                             | Description               |
|------------------------------------|---------------------------|
| ![](/assets/file-code-2.svg)       | Show custom script editor |
| ![](/assets/panel-right-close.svg) | Hide custom script editor |
| ![](/assets/refresh-cw.svg)        | Reset custom script       |
| ![](/assets/play.svg)              | Run custom script         |

See [Boop custom script documentation](https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/CustomScripts.md) for more information on how to write scripts.
