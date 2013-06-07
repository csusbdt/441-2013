#pragma strict

// This controller derived from the example in the unity docs; see the following.
// http://docs.unity3d.com/Documentation/ScriptReference/CharacterController.Move.html

private var speed : float = 3;
private var jumpSpeed : float = 3.0;
private var gravity : float = 10.0;

private var attackCooldown : float = .4;
private var attackCooldownRemaining : float = 0;

private var moveDirection : Vector3 = Vector3.zero;


function Start() {
  transform.up = Vector3(0, 1, 0);
  transform.forward = Vector3(1, 0, 0);
  transform.right = Vector3(0, 0, -1);
}

function Update() {
  var controller : CharacterController = GetComponent(CharacterController);
  var anim : Rick_Anim = GetComponent(Rick_Anim);
  if (controller.isGrounded) {
    if (Input.GetAxis("Horizontal") > .001) {
      transform.forward = Vector3(1, 0, 0);
      transform.right = Vector3(0, 0, -1);
      anim.walk();
    } else if (Input.GetAxis("Horizontal") < -.001) {
      transform.forward = Vector3(-1, 0, 0);
      transform.right = Vector3(0, 0, 1);
      anim.walk();
    } else {
      anim.idle();
    }
    moveDirection = Vector3(Input.GetAxis("Horizontal"), 0, 0);
    moveDirection *= speed;
    if (Input.GetButton("Jump")) {
      moveDirection.y = jumpSpeed;
      anim.idle();
    }
  } else {
    moveDirection.y -= gravity * Time.deltaTime;
  }
  if (attackCooldownRemaining > 0) attackCooldownRemaining -= Time.deltaTime;
  if (attackCooldownRemaining <= 0 && Input.GetButton("Fire1")) {
    attackCooldownRemaining = attackCooldown;
    anim.attack();
  }
  controller.Move(moveDirection * Time.deltaTime);
}
