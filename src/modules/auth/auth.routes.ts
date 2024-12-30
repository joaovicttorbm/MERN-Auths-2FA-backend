import { Router } from "express";
import { authController } from "./auth.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

const authRoutes = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint for registering a new user in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: The password for the account.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: Must match the password field.
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64a2c7e0f5f5b4a2c7e0f5f5
 *                       description: The unique identifier of the user.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the user.
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                       description: The email of the user.
 *       400:
 *         description: Validation error or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 code:
 *                   type: string
 *             examples:
 *               PasswordMismatch:
 *                 value:
 *                   error: Password does not match
 *                   code: VALIDATION_ERROR
 *               EmailAlreadyExists:
 *                 value:
 *                   error: User already exists with this email
 *                   code: AUTH_EMAIL_ALREADY_EXISTS
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with email and password, returning access and refresh tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: The user's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User login successfully
 *                 mfaRequired:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if MFA is required.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64a2c7e0f5f5b4a2c7e0f5f5
 *                       description: The unique user identifier.
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                       description: The name of the user.
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                       description: The email of the user.
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password provided
 *                 code:
 *                   type: string
 *                   example: AUTH_USER_NOT_FOUND
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/login", authController.login);

/**
 * @swagger
 * /auth/verify/email:
 *   post:
 *     summary: Verify user's email
 *     description: Endpoint for verifying the user's email address using a verification code.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *                 description: The email verification code sent to the user.
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *       400:
 *         description: Invalid or expired verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired verification code
 *                 code:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/verify/email", authController.verifyEmail);

/**
 * @swagger
 * /auth/password/forgot:
 *   post:
 *     summary: Send a password reset email
 *     description: Endpoint for sending a password reset email to the user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: The email of the user requesting the password reset.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       400:
 *         description: Invalid email or other validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       429:
 *         description: Too many requests sent within a short period
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Too many requests, try again later
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/password/forgot", authController.forgotPassword);

/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Reset the user's password using a verification code
 *     description: Endpoint for resetting the user's password by providing a valid verification code and new password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *                 description: The new password for the user.
 *               verificationCode:
 *                 type: string
 *                 example: "ABC1234XYZ"
 *                 description: The verification code received by the user for password reset.
 *             required:
 *               - password
 *               - verificationCode
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset Password successfully
 *       400:
 *         description: Invalid password or verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to reset password!
 *       404:
 *         description: Verification code not found or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired verification code
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/password/reset", authController.resetPassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log the user out of the application
 *     description: Endpoint to log the user out by invalidating the session and clearing authentication cookies.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logout successfully
 *       404:
 *         description: Session not found or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Session is invalid.
 *       500:
 *         description: Server error while logging out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
authRoutes.post("/logout", authenticateJWT, authController.logout);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh the user's access and refresh tokens.
 *     description: Endpoint to refresh the access token by using the provided refresh token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your_refresh_token"
 *                 description: The refresh token used to generate new access and refresh tokens.
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Tokens successfully refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "new_access_token"
 *                 newRefreshToken:
 *                   type: string
 *                   example: "new_refresh_token"
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid refresh token
 */
authRoutes.get("/refresh-token", authController.refreshToken);

export default authRoutes;
