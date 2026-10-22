import { ToolSchema, type Tool } from "@playground/contracts";

/** The terminal setup and the apps in daily rotation. */
export const tools: Tool[] = ToolSchema.array().parse([
  // Terminal booth
  {
    slug: "alacritty",
    name: "Alacritty",
    section: "terminal",
    category: "emulator",
    url: "https://alacritty.org/",
    why: "Fast, GPU-rendered and deliberately small. Tabs and splits are tmux's job.",
    order: 1,
  },
  {
    slug: "tmux",
    name: "tmux",
    section: "terminal",
    category: "multiplexer",
    url: "https://github.com/tmux/tmux",
    why: "Sessions that survive closing the window, and splits that open in the current directory.",
    details: `Prefix moved to \`C-a\`, panes moved with \`h/j/k/l\`, and copy mode uses vi keys:

\`\`\`tmux
set -g prefix C-a
setw -g mode-keys vi
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
bind '"' split-window -v -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"
\`\`\`

Plugins via tpm: tmux-sensible, tmux-yank and the catppuccin theme.`,
    order: 2,
  },
  {
    slug: "zsh",
    name: "zsh + starship",
    section: "terminal",
    category: "shell",
    url: "https://starship.rs/",
    why: "zsh with a starship prompt: git branch, runtime versions and nothing else in the way.",
    order: 3,
  },
  {
    slug: "zoxide-fzf",
    name: "zoxide + fzf",
    section: "terminal",
    category: "shell",
    url: "https://github.com/ajeetdsouza/zoxide",
    why: "`z play` jumps to the playground from anywhere; fzf fuzzy-finds history and files.",
    order: 4,
  },
  {
    slug: "neovim",
    name: "Neovim",
    section: "terminal",
    category: "editor",
    url: "https://neovim.io/",
    why: "Where most of the code gets written. A Lua config, managed with lazy.nvim.",
    details: `The plugins that carry their weight:

- **telescope** to find files and grep, with the native fzf sorter
- **harpoon** to jump between the four files I'm actually working in
- **nvim-lspconfig + mason** for language servers, **nvim-cmp** for completion
- **nvim-dap** with the VS Code JS adapter for debugging Node
- **vim-fugitive** and **gitsigns** for git, **undotree** for the undo history
- **trouble** for diagnostics, **zen-mode** for writing

A few remaps I'd miss:

\`\`\`lua
vim.keymap.set("i", "jj", "<Esc>")            -- leave insert mode
vim.keymap.set("n", "<space>j", ":cnext<CR>") -- walk the quickfix list
vim.keymap.set("n", "<space>k", ":cprev<CR>")
vim.keymap.set("n", "<space>x", ":.lua<CR>")  -- run the current line as Lua
\`\`\`

Relative line numbers, no wrap, \`scrolloff = 8\` and a persistent undo file. And yes, **cellular-automaton** is installed, for when the code deserves to melt.`,
    order: 5,
  },
  {
    slug: "cli-kit",
    name: "ripgrep, fd, bat, jq",
    section: "terminal",
    category: "cli",
    url: "https://github.com/BurntSushi/ripgrep",
    why: "Faster, friendlier grep, find and cat, plus jq for every JSON response.",
    order: 6,
  },
  {
    slug: "lazygit",
    name: "lazygit",
    section: "terminal",
    category: "cli",
    url: "https://github.com/jesseduffield/lazygit",
    why: "Staging hunks and fixing up commits without remembering the flags.",
    order: 7,
  },
  {
    slug: "gh",
    name: "GitHub CLI",
    section: "terminal",
    category: "cli",
    url: "https://cli.github.com/",
    why: "PRs, checks and issues without leaving the terminal. Every PR on this site went through it.",
    order: 8,
  },

  // Toolset booth
  {
    slug: "claude-code",
    name: "Claude Code",
    section: "toolset",
    category: "ai",
    url: "https://claude.com/claude-code",
    why: "Agentic coding in the terminal. Pairs with me on this site, with skills for commits and PRs.",
    order: 1,
  },
  {
    slug: "opencode",
    name: "opencode",
    section: "toolset",
    category: "ai",
    url: "https://opencode.ai/",
    why: "A second, independent coding agent, handy for a second opinion or for running tests.",
    order: 2,
  },
  {
    slug: "cursor-vscode",
    name: "Cursor & VS Code",
    section: "toolset",
    category: "editors",
    url: "https://cursor.com/",
    why: "For pairing sessions and the odd extension Neovim doesn't have. Vim keybindings, always.",
    order: 3,
  },
  {
    slug: "raycast",
    name: "Raycast",
    section: "toolset",
    category: "macos",
    url: "https://www.raycast.com/",
    why: "Launcher, clipboard history and window management behind one shortcut.",
    order: 4,
  },
  {
    slug: "karabiner",
    name: "Karabiner-Elements",
    section: "toolset",
    category: "macos",
    url: "https://karabiner-elements.pqrs.org/",
    why: "Home-row mods: hold a, s, d or f for command, option, shift or control. Fewer finger gymnastics.",
    order: 5,
  },
  {
    slug: "arc",
    name: "Arc",
    section: "toolset",
    category: "macos",
    url: "https://arc.net/",
    why: "Spaces per context, so work, side projects and reading don't share a tab bar.",
    order: 6,
  },
  {
    slug: "api-clients",
    name: "Posting, Insomnia & Postman",
    section: "toolset",
    category: "apis",
    url: "https://posting.sh/",
    why: "Posting for quick requests in the terminal; Insomnia and Postman when a team collection lives there.",
    order: 7,
  },
  {
    slug: "docker",
    name: "Docker",
    section: "toolset",
    category: "infra",
    url: "https://www.docker.com/",
    why: "Local databases and services that match production, started with one command.",
    order: 8,
  },
]);
