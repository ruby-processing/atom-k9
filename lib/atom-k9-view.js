'use babel';

import { View, $$ } from 'atom-space-pen-views';

export default class JRubyArtView extends View {

  static content() {
    return this.div(() => {
      // Display layout and outlets
      let css = 'tool-panel panel panel-bottom padding script-view native-key-bindings';
      return this.div({class: css, outlet: 'script', tabindex: -1}, () => {
        return this.div({class: 'panel-body padded output', outlet: 'output'});
      }
      );
    }
    );
  }
  log(line) {
    console.log(line);
    this.output.append($$(function() {
      return this.pre({class: "line"}, () => {
        return this.raw(line);
      }
      );
    })
    );
    let height = this.script[0].scrollHeight;
    return this.script.scrollTop(height);
  }
  clear() {
    return this.output.empty();
  }
};
