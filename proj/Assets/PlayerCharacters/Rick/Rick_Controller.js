#pragma strict

// This controller derived from the example in the unity docs; see the following.
// http://docs.unity3d.com/Documentation/ScriptReference/CharacterController.Move.html

var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;

private var moveDirection : Vector3 = Vector3.zero;

function Update() {
  var controller : CharacterController = GetComponent(CharacterController);
  var anim : Rick_Anim = GetComponent(Rick_Anim);
  if (controller.isGrounded) {
    if (Input.GetAxis("Horizontal") > .001) {
      transform.rotation = Quaternion.identity;
    } else if (Input.GetAxis("Horizontal") < -.001) {
      transform.rotation = Quaternion.Euler(180, 0, 0);
    }
    moveDirection = Vector3(-Input.GetAxis("Horizontal"), 0, 0);
    moveDirection = transform.TransformDirection(moveDirection);
    moveDirection *= speed;
    if (Input.GetButton("Jump")) {
      moveDirection.y = jumpSpeed;
      anim.idle();
    } else {
      anim.walk();
    }
  }
  moveDirection.y -= gravity * Time.deltaTime;
  controller.Move(moveDirection * Time.deltaTime);
}
