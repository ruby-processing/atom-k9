atom-k9 = require '../lib/atom-k9'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "atom-k9", ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('atom-k9')

  describe "when the atom-k9:toggle event is triggered", ->
    it "hides and shows the modal panel", ->
      # Before the activation event the view is not on the DOM, and no panel
      # has been created
      expect(workspaceElement.querySelector('.atom-k9')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'atom-k9:run'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(workspaceElement.querySelector('.atom-k9')).toExist()

        atom-k9Element = workspaceElement.querySelector('.atom-k9')
        expect(atom-k9Element).toExist()

        atom-k9Panel = atom.workspace.panelForItem(atom-k9Element)
        expect(atom-k9Panel.isVisible()).toBe true
        atom.commands.dispatch workspaceElement, 'atom-k9:run'
        expect(atom-k9Panel.isVisible()).toBe false

    it "hides and shows the view", ->
      # This test shows you an integration test testing at the view level.

      # Attaching the workspaceElement to the DOM is required to allow the
      # `toBeVisible()` matchers to work. Anything testing visibility or focus
      # requires that the workspaceElement is on the DOM. Tests that attach the
      # workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement)

      expect(workspaceElement.querySelector('.atom-k9')).not.toExist()

      # This is an activation event, triggering it causes the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'atom-k9:run'

      waitsForPromise ->
        activationPromise

      runs ->
        # Now we can test for view visibility
        atom-k9Element = workspaceElement.querySelector('.atom-k9')
        expect(atom-k9Element).toBeVisible()
        atom.commands.dispatch workspaceElement, 'atom-k9:run'
        expect(atom-k9Element).not.toBeVisible()
