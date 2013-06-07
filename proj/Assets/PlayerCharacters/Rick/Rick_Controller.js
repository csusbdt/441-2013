#pragma strict

private var speed : float = 1.8;
private var controller : CharacterController = null;
private var anim : Rick_Anim = null;
private var forwardVelocity: Vector2 = new Vector2(speed, 0);
private var jumpSpeed : float = 8.0;
private var jumpVelocity: Vector2 = new Vector2(0, jumpSpeed);
private var currentJumpVelocity: Vector2 = Vector2.zero;

function Start () {
  controller = collider as CharacterController;
  anim = GetComponent(Rick_Anim);
}

function Update () {
  if (Input.GetAxis("Horizontal") > 0.001) {
    anim.walk();
    transform.localScale = Vector3(1, 1, 1);
    controller.SimpleMove(-forwardVelocity);
  } else if (Input.GetAxis("Horizontal") < -0.001) {
    anim.walk();
    transform.localScale = Vector3(-1, 1, 1);
    controller.SimpleMove(forwardVelocity);
  } else {
    anim.idle();
    controller.SimpleMove(Vector2.zero);
  }
  if (Input.GetButton("Jump")) {
    currentJumpVelocity = jumpVelocity;
  }
  if (Input.GetButton ("Fire1")) {
    anim.attack();
  } 
  //controller.Move(currentJumpVelocity);
  //currentJumpVelocity = 0.5 * currentJumpVelocity;
}
