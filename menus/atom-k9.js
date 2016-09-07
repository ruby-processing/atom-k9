# See https://atom.io/docs/latest/creating-a-package#menus for more details
'context-menu':
  'atom-text-editor': [
    {
      'label': 'Watch Sketch'
      'command': 'atom-k9:watch'
    }
  ]

'menu': [
  {
    label: 'Packages'
    submenu: [
      label: 'JRubyArt'
      submenu: [
        { label: 'JRubyArt: Run', command: 'atom-k9:run' },
        { label: 'JRubyArt: Watch', command: 'atom-k9:watch' },
        { label: 'Close: Console Window', command: 'atom-k9:close' }
      ]
    ]
  }
]
