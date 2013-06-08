#pragma strict

// Each frame is a Vector3 containing (xOffset, yOffset, duration)

private var idleFrames = [
  Vector3(0, .6666666, .08)
];

private var walkFrameDuration : float = .10;

private var walkFrames = [ 
  Vector3(.000, .3333333, walkFrameDuration),
  Vector3(.125, .3333333, walkFrameDuration),
  Vector3(.250, .3333333, walkFrameDuration),
  Vector3(.375, .3333333, walkFrameDuration),
  Vector3(.500, .3333333, walkFrameDuration),
  Vector3(.625, .3333333, walkFrameDuration),
  Vector3(.750, .3333333, walkFrameDuration),
  Vector3(.875, .3333333, walkFrameDuration)
];

private var attackFrameDuration : float = .11;
  
private var attackFrames = [ 
  Vector3(   0, 0, attackFrameDuration), 
  Vector3(.125, 0, attackFrameDuration), 
  Vector3(.250, 0, attackFrameDuration) 
];

private var loopAnimFrames : Vector3[] = idleFrames;  // idleOffsets or walkOffsets
private var loopAnimIndex = 0;

private var nonLoopAnimFrames : Vector3[] = null;  // attackOffsets
private var nonLoopAnimIndex = 0;

private var faceRightScale : Vector3;
private var faceLeftScale : Vector3;

function Awake() {
  faceRightScale = transform.localScale;
  faceLeftScale = Vector3(-1 * transform.localScale.x, transform.localScale.y, transform.localScale.z);
  StartCoroutine(Anim());
}

function Update() {
  // Mirror the texture based on facing direction.
  if (transform.forward.x > 0) {
    transform.localScale = faceRightScale;
  } else {
    transform.localScale = faceLeftScale;
  }
}

function idle() {
  if (loopAnimFrames !== idleFrames) {
    loopAnimFrames = idleFrames;
    loopAnimIndex = 0;
  }
}

function walk() {
  if (loopAnimFrames !== walkFrames) {
    loopAnimFrames = walkFrames;
    loopAnimIndex = 0;
  }
}

function attack() {
  if (nonLoopAnimFrames === null) {
    nonLoopAnimFrames = attackFrames;
    nonLoopAnimIndex = 0;
  }
}

private function Anim() {
  var frameDuration : float = 0;
  while (true) {
    if (nonLoopAnimFrames) {
      renderer.material.SetTextureOffset("_MainTex", nonLoopAnimFrames[nonLoopAnimIndex]);
      frameDuration = nonLoopAnimFrames[nonLoopAnimIndex].z;
      ++nonLoopAnimIndex;
      if (nonLoopAnimIndex >= nonLoopAnimFrames.length) {
        nonLoopAnimFrames = null;
        nonLoopAnimIndex = 0;
      }
    } else {
      renderer.material.SetTextureOffset("_MainTex", loopAnimFrames[loopAnimIndex]);
      frameDuration = loopAnimFrames[loopAnimIndex].z;
      loopAnimIndex = (loopAnimIndex + 1) % loopAnimFrames.length;
    }
    yield new WaitForSeconds (frameDuration);
  };
}
