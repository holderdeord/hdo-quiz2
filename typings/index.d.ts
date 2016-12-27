/// <reference path="globals/core-js/index.d.ts" />
/// <reference path="globals/hammerjs/index.d.ts" />
/// <reference path="globals/source-map/index.d.ts" />
/// <reference path="globals/uglify-js/index.d.ts" />
/// <reference path="globals/webpack/index.d.ts" />

declare var Card: {
  on(event, listener: Function);
  throwIn(x, y);
  throwOut(x, y);
  destroy();
};
declare var Stack: any;
