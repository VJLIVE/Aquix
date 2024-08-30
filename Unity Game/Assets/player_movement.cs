using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField]
    private CharacterController2D controller; // Reference to the CharacterController2D component
    public Animator animator;
    [SerializeField]
    private float runSpeed = 40f; // Speed at which the player moves

    private float horizontalMove = 0f; // Movement in the horizontal direction
    private bool jump = false; // Flag to determine if the player should jump
    private bool crouch = false; // Flag to determine if the player is crouching

    // Update is called once per frame
    void Update()
    {
        // Get input for horizontal movement
        horizontalMove = Input.GetAxisRaw("Horizontal") * runSpeed;

        // Update animator parameters
        animator.SetFloat("Speed", Mathf.Abs(horizontalMove));
        animator.SetBool("IsCrouching", crouch);

        // Check for jump input
        if (Input.GetButtonDown("Jump"))
        {
            jump = true;
            animator.SetBool("IsJumping", true);
        }

        // Check for crouch input
        if (Input.GetButtonDown("Crouch"))
        {
            crouch = true;
        }
        else if (Input.GetButtonUp("Crouch"))
        {
            crouch = false;
        }
    }

    public void OnLanding()
    {
        animator.SetBool("IsJumping", false);
    }

    private void FixedUpdate()
    {
        // Move the player character
        controller.Move(horizontalMove * Time.fixedDeltaTime, crouch, jump);

        // Reset jump flag after applying jump
        jump = false;
    }
}
