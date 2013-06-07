#pragma strict

private var idleOffsets = [ 
  new Vector2(0, .6666666)
];

private var walkOffsets = [ 
  new Vector2(.000, .3333333),
  new Vector2(.125, .3333333),
  new Vector2(.250, .3333333),
  new Vector2(.375, .3333333),
  new Vector2(.500, .3333333),
  new Vector2(.625, .3333333),
  new Vector2(.750, .3333333),
  new Vector2(.875, .3333333)
];
  
private var attackOffsets = [ 
  Vector2(0, 0), 
  Vector2(.125, 0), 
  Vector2(.250, 0) 
];

private var loopAnimOffsets : Vector2[] = idleOffsets;  // idleOffsets or walkOffsets
private var loopAnimIndex = 0;

private var nonLoopAnimOffsets : Vector2[] = null;  // attackOffsets
private var nonLoopAnimIndex = 0;

function Awake() { 
  StartCoroutine(Anim());
}

function idle() {
  if (loopAnimOffsets !== idleOffsets) {
    loopAnimOffsets = idleOffsets;
    loopAnimIndex = 0;
  }
}

function walk() {
  if (loopAnimOffsets !== walkOffsets) {
    loopAnimOffsets = walkOffsets;
    loopAnimIndex = 0;
  }
}

function attack() {
  if (nonLoopAnimOffsets === null) nonLoopAnimOffsets = attackOffsets;
}

private function Anim() {
  while (true) {
    if (nonLoopAnimOffsets) {
      renderer.material.SetTextureOffset("_MainTex", nonLoopAnimOffsets[nonLoopAnimIndex]);
      ++nonLoopAnimIndex;
      if (nonLoopAnimIndex >= nonLoopAnimOffsets.length) {
        nonLoopAnimOffsets = null;
        nonLoopAnimIndex = 0;
      }
    }
    else {
      renderer.material.SetTextureOffset("_MainTex", loopAnimOffsets[loopAnimIndex]);
      loopAnimIndex = (loopAnimIndex + 1) % loopAnimOffsets.length;
    }
    yield new WaitForSeconds (.08);
  };
}
