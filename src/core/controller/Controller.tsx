import { Color } from "../Color";
import { CircleFlameEffect } from "../effect/concrete/circleFlameEffect";
import { ProgressNumber } from "../ProgressNumber";
import { Vector } from "../Vector";
import { Renderer } from "../render/canvas2d/renderer";
import { Stage } from "../stage/Stage";
import { TextRiseEffect } from "../effect/concrete/textRiseEffect";
import { NodeManager } from "../NodeManager";
import { Camera } from "../stage/Camera";
import { Rectangle } from "../Rectangle";

export namespace Controller {
  /**
   * 在上层接收React提供的state修改函数
   */
  export let setCursorName: (_: string) => void = (_) => {};

  // 检测正在按下的键
  export const pressingKeySet: Set<string> = new Set();
  export function pressingKeysString(): string {
    let res = "";
    for (const key of pressingKeySet) {
      res += `[${key}]` + " ";
    }
    return res;
  }
  // 按键映射
  export const keyMap: { [key: string]: Vector } = {
    w: new Vector(0, -1),
    s: new Vector(0, 1),
    a: new Vector(-1, 0),
    d: new Vector(1, 0),
  };

  /**
   * 存放鼠标 左 中 右 键上次 "按下" 时候的world位置
   */
  const lastMousePressLocation: Vector[] = [
    Vector.getZero(),
    Vector.getZero(),
    Vector.getZero(),
  ];
  export function lastMousePressLocationString(): string {
    return lastMousePressLocation.map((v) => v.toString()).join(",");
  }
  /**
   * 存放鼠标 左 中 右 键上次 "松开" 时候的world位置
   */
  const lastMouseReleaseLocation: Vector[] = [
    Vector.getZero(),
    Vector.getZero(),
    Vector.getZero(),
  ];
  export function lastMouseReleaseLocationString(): string {
    return lastMouseReleaseLocation.map((v) => v.toString()).join(",");
  }

  export let touchStartLocation = Vector.getZero();
  export let touchStartDistance = 0;
  export let touchDelta = Vector.getZero();

  export let isMouseDown: boolean[] = [false, false, false];
  export let canvasElement: HTMLCanvasElement;

  export function init(canvasElement: HTMLCanvasElement) {
    canvasElement = canvasElement;
    // 绑定事件
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    canvasElement.addEventListener("mousedown", mousedown);
    canvasElement.addEventListener("mousemove", mousemove);
    canvasElement.addEventListener("mouseup", mouseup);
    canvasElement.addEventListener("wheel", mousewheel);
    canvasElement.addEventListener("dblclick", dblclick);
    canvasElement.addEventListener("touchstart", touchstart);
    canvasElement.addEventListener("touchmove", touchmove);
    canvasElement.addEventListener("touchend", touchend);
  }

  function moveCameraByMouseMove(e: MouseEvent, mouseIndex: number) {
    const currentMouseMoveLocation = Renderer.transformView2World(
      new Vector(e.clientX, e.clientY),
    );
    const diffLocation = currentMouseMoveLocation.subtract(
      lastMousePressLocation[mouseIndex],
    );
    Camera.location = Camera.location.subtract(diffLocation);
  }

  function mousedown(e: MouseEvent) {
    // 阻止默认行为，防止右键菜单弹出
    e.preventDefault();

    isMouseDown[e.button] = true;

    const pressWorldLocation = Renderer.transformView2World(
      new Vector(e.clientX, e.clientY),
    );
    const clickedNode = NodeManager.findNodeByLocation(pressWorldLocation);

    // 获取左右中键
    const button = e.button;
    lastMousePressLocation[button] = pressWorldLocation;
    if (button === 0) {
      /**
       * 可能的4种情况
       *  ------------ | 已有节点被选择 | 没有节点被选择
       *  在空白地方按下 |      A       |      B
       *  在节点身上按下 |      C       |      D
       *  ------------ |  ------------ |  ------------
       * A：取消选择那些节点，可能要重新开始框选
       * B：可能是想开始框选
       * C：如果点击的节点属于被上次选中的节点中，那么整体移动，（如果还按下了Alt键，开始整体复制）
       *   如果点击的节点不属于被上次选中的节点中，那么单击选择，并取消上一次框选的所有节点
       * D：只想单击这一个节点，或者按下Alt键的时候，想复制这个节点
       *
       * 更新被选中的节点，如果没有选中节点就开始框选
       */
      // 左键按下
      if (clickedNode === null) {
        // AB
        Stage.isSelecting = true;
        Stage.selectingRectangle = new Rectangle(
          pressWorldLocation.clone(),
          Vector.getZero(),
        );
      } else {
        // CD
      }
    } else if (button === 1) {
      // 中键按下
    } else if (button === 2) {
      // 右键按下
    }

    // Stage.effects.push(
    //   new TextRiseEffect(
    //     `鼠标按下 ${button === 0 ? "左键" : button === 1 ? "中键" : "右键"}`,
    //   ),
    // );
    Stage.effects.push(
      new CircleFlameEffect(
        new ProgressNumber(0, 40),
        Renderer.transformView2World(new Vector(e.clientX, e.clientY)),
        50,
        new Color(255, 0, 0, 1),
      ),
    );
  }

  function mousemove(e: MouseEvent) {
    const worldLocation = Renderer.transformView2World(
      new Vector(e.clientX, e.clientY),
    );
    // 如果当前有按下空格
    if (pressingKeySet.has(" ") && isMouseDown[0]) {
      console.log("空格按下的同时按下了鼠标左键");
      moveCameraByMouseMove(e, 0);
      setCursorName("grabbing");
      return;
    }
    if (isMouseDown[0]) {
      Stage.effects.push(
        new CircleFlameEffect(
          new ProgressNumber(0, 5),
          Renderer.transformView2World(new Vector(e.clientX, e.clientY)),
          30,
          new Color(141, 198, 229, 1),
        ),
      );
      if (Stage.selectingRectangle)
        Stage.selectingRectangle.size = worldLocation.subtract(
          lastMousePressLocation[0],
        );
    } else if (isMouseDown[1]) {
      // 中键按下
      moveCameraByMouseMove(e, 1);
      setCursorName("grabbing");
      return;
    } else if (isMouseDown[2]) {
      // 右键按下
    }
    // setCursorName("default");
  }

  function mouseup(e: MouseEvent) {
    // 阻止默认行为
    e.preventDefault();
    isMouseDown[e.button] = false;
    Stage.effects.push(
      new CircleFlameEffect(
        new ProgressNumber(0, 40),
        Renderer.transformView2World(new Vector(e.clientX, e.clientY)),
        50,
        new Color(0, 0, 255, 1),
      ),
    );
    if (e.button === 0) {
      // 左键松开
      Stage.isSelecting = false;
    } else if (e.button === 1) {
      // 中键松开
      setCursorName("default");
    } else if (e.button === 2) {
      // 右键松开
    }
    // 记录松开位置
    lastMouseReleaseLocation[e.button] = Renderer.transformView2World(
      new Vector(e.clientX, e.clientY),
    );
    // Stage.effects.push(new TextRiseEffect("mouse up"));
  }

  function mousewheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      Camera.targetScale *= 0.8;
    } else {
      Camera.targetScale *= 1.2;
    }
  }

  function dblclick(e: MouseEvent) {
    const pressLocation = Renderer.transformView2World(
      new Vector(e.clientX, e.clientY),
    );
    let clickedNode = NodeManager.findNodeByLocation(pressLocation);
    // 如果是左键
    if (e.button === 0) {
      for (const node of NodeManager.nodes) {
        if (node.rectangle.isPointInside(pressLocation)) {
          Stage.effects.push(new TextRiseEffect("Node clicked: " + node.uuid));
          clickedNode = node;
          break;
        }
      }

      if (clickedNode !== null) {
        // 编辑节点
        let user_input = prompt("请输入节点名称", clickedNode.text);
        if (user_input) {
          NodeManager.renameNode(clickedNode, user_input);
        }
      } else {
        // 新建节点
        NodeManager.addNodeByClick(
          Renderer.transformView2World(new Vector(e.clientX, e.clientY)),
        );
      }
    }
    Stage.effects.push(
      new CircleFlameEffect(
        new ProgressNumber(0, 40),
        Renderer.transformView2World(new Vector(e.clientX, e.clientY)),
        100,
        new Color(0, 255, 0, 1),
      ),
    );
  }

  function keydown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    pressingKeySet.add(key);
    if (keyMap[key]) {
      // 当按下某一个方向的时候,相当于朝着某个方向赋予一次加速度
      Camera.accelerateCommander = Camera.accelerateCommander
        .add(keyMap[key])
        .limitX(-1, 1)
        .limitY(-1, 1);
    }
    if (key === " ") {
      setCursorName("grab");
    }
  }

  function keyup(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (!pressingKeySet.has(key)) {
      // FIXME: 但这里有个问题，在按下 ctrl+alt+a 时，会显示画面一直往右走。原因是按下a没有被检测到，但抬起a被检测到了
      // 所以松开某个移动的按键时，还要检测之前是否已经按下了这个按键
      return;
    } else {
      pressingKeySet.delete(key);
    }
    if (keyMap[key]) {
      // 当松开某一个方向的时候,相当于停止加速度
      Camera.accelerateCommander = Camera.accelerateCommander
        .subtract(keyMap[key])
        .limitX(-1, 1)
        .limitY(-1, 1);
    }
    setCursorName("default");
  }

  function touchstart(e: TouchEvent) {
    e.preventDefault();
    if (e.touches.length === 2) {
      const touch1 = Vector.fromTouch(e.touches[0]);
      const touch2 = Vector.fromTouch(e.touches[1]);
      const center = Vector.average(touch1, touch2);
      touchStartLocation = center;

      // 计算初始两指间距离
      touchStartDistance = touch1.distance(touch2);
    }
  }

  function touchmove(e: TouchEvent) {
    e.preventDefault();

    if (e.touches.length === 2) {
      const touch1 = Vector.fromTouch(e.touches[0]);
      const touch2 = Vector.fromTouch(e.touches[1]);
      const center = Vector.average(touch1, touch2);
      touchDelta = center.subtract(touchStartLocation);

      // 计算当前两指间的距离
      const currentDistance = touch1.distance(touch2);
      const scaleRatio = currentDistance / touchStartDistance;

      // 缩放画面
      Camera.targetScale *= scaleRatio;
      touchStartDistance = currentDistance; // 更新距离

      // 更新中心点位置
      touchStartLocation = center;

      // 移动画面
      Camera.location = Camera.location.subtract(
        touchDelta.multiply(1 / Camera.currentScale),
      );
    }
  }

  function touchend(e: TouchEvent) {
    e.preventDefault();
    // 移动画面
    Camera.accelerateCommander = touchDelta
      .multiply(-1)
      .multiply(Camera.currentScale)
      .limitX(-1, 1)
      .limitY(-1, 1);
    touchDelta = Vector.getZero();
    setTimeout(() => {
      Camera.accelerateCommander = Vector.getZero();
    }, 100);
  }

  export function destroy() {
    window.removeEventListener("keydown", keydown);
    window.removeEventListener("keyup", keyup);
    canvasElement.removeEventListener("mousedown", mousedown);
    canvasElement.removeEventListener("mousemove", mousemove);
    canvasElement.removeEventListener("mouseup", mouseup);
    canvasElement.removeEventListener("wheel", mousewheel);
    canvasElement.removeEventListener("dblclick", dblclick);
    canvasElement.removeEventListener("touchstart", touchstart);
    canvasElement.removeEventListener("touchmove", touchmove);
    canvasElement.removeEventListener("touchend", touchend);
    console.log("Controller destroyed.");
  }
}