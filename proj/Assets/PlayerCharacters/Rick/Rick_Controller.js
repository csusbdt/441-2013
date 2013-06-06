#pragma strict

private var speed : float = 0.03;
private var controller : CharacterController = null;
private var anim : Rick_Anim = null;
private var forwardVelocity: Vector2 = new Vector2(speed, 0);

function Start () {
  controller = collider as CharacterController;
  anim = GetComponent(Rick_Anim);
}

function Update () {
  if (Input.GetButton ("Fire1")) {
    anim.attack();
  } else if (Input.GetAxis("Horizontal") > 0.001) {
    anim.walk();
    controller.Move(-forwardVelocity);
  } else if (Input.GetAxis("Horizontal") < -0.001) {
    anim.walk();
    controller.Move(forwardVelocity);
  } else {
    anim.idle();
  }
}