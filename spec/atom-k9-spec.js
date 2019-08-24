'use babel';

import JRubyArtView from '../lib/atom-k9-view';

describe('The JRubyArt console it should be empty on clear', () => {
  it('expect it does something', () => {
    let view = new JRubyArtView();
    atom.workspace.addBottomPanel({item: this.view});
    expect(view != null);
    view.clear();
    expect(view == []);
  });
});
