/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
module phosphor.virtualdom {

import IMessage = core.IMessage;
import NodeBase = core.NodeBase;
import clearMessageData = core.clearMessageData;

import emptyArray = utility.emptyArray;
import emptyObject = utility.emptyObject;


/**
 * A concrete implementation of IComponent.
 *
 * This class serves as a convenient base class for components which
 * manage the content of their node independent of the virtual DOM.
 */
export
class BaseComponent<T extends IData> extends NodeBase implements IComponent<T> {
  /**
   * Construct a new base component.
   */
  constructor(data: T, children: Elem[]) {
    super();
    this._data = data;
    this._children = children;
  }

  /**
   * Dispose of the resources held by the component.
   */
  dispose(): void {
    clearMessageData(this);
    this._data = null;
    this._children = null;
    super.dispose();
  }

  /**
   * Get the current data object for the component.
   */
  get data(): T {
    return this._data;
  }

  /**
   * Get the current elem children for the component.
   */
  get children(): Elem[] {
    return this._children;
  }

  /**
   * Initialize the component with new data and children.
   *
   * This is called whenever the component is re-rendered by its parent.
   *
   * It is *not* called when the component is first instantiated.
   */
  init(data: T, children: Elem[]): void {
    this._data = data;
    this._children = children;
  }

  /**
   * Process a message sent to the component.
   */
  processMessage(msg: IMessage): void {
    switch (msg.type) {
    case 'update-request':
      this.onUpdateRequest(msg);
      break;
    case 'after-attach':
      this.onAfterAttach(msg);
      break;
    case 'before-detach':
      this.onBeforeDetach(msg);
      break;
    case 'before-move':
      this.onBeforeMove(msg);
      break;
    case 'after-move':
      this.onAfterMove(msg);
      break;
    }
  }

  /**
   * A method invoked on an 'update-request' message.
   *
   * The default implementation is a no-op.
   */
  protected onUpdateRequest(msg: IMessage): void { }

  /**
   * A method invoked on an 'after-attach' message.
   *
   * The default implementation is a no-op.
   */
  protected onAfterAttach(msg: IMessage): void { }

  /**
   * A method invoked on a 'before-detach' message.
   *
   * The default implementation is a no-op.
   */
  protected onBeforeDetach(msg: IMessage): void { }

  /**
   * A method invoked on a 'before-move' message.
   *
   * The default implementation is a no-op.
   */
  protected onBeforeMove(msg: IMessage): void { }

  /**
   * A method invoked on an 'after-move' message.
   *
   * The default implementation is a no-op.
   */
  protected onAfterMove(msg: IMessage): void { }

  private _data: T = emptyObject;
  private _children: Elem[] = emptyArray;
}

} // module phosphor.virtualdom
