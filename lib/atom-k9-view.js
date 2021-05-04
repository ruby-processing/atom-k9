'use babel';

import { ScrollView, $$ } from 'atom-space-pen-views-plus';

export default class JRubyArtView extends ScrollView {

  static content() {
    this.div(() => {
      // Display layout and outlets
      let css = 'tool-panel panel panel-bottom padding script-view native-key-bindings';
      this.div({class: css, outlet: 'script', tabindex: -1}, () => {
        this.div({class: 'panel-body padded output', outlet: 'output'});
      }
      );
    }
    );
  }
  log(line) {
    console.log(line);
    this.output.append($$(function() {
      this.pre({class: "line"}, () => {
        this.raw(line);
      }
      );
    })
    );
  }
  clear() {
    this.output.empty();
  }
};
