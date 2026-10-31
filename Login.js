import java.util.Scanner;

// Hope, Inc. ERP - Sign In page (console version)
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean running = true;

        System.out.println("=================================");
        System.out.println("         Welcome back!");
        System.out.println(" Sign in to your Hope, Inc. ERP account");
        System.out.println("=================================");

        while (running) {
            System.out.println();
            System.out.println("1. Sign In");
            System.out.println("2. Forgot Password?");
            System.out.println("3. Continue with Google");
            System.out.println("4. Register");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            if (choice.equals("1")) {
                signIn(input);
            } else if (choice.equals("2")) {
                System.out.println("Forgot password page coming soon.");
            } else if (choice.equals("3")) {
                System.out.println("Connect Google authentication to enable this feature.");
            } else if (choice.equals("4")) {
                System.out.println("Register page coming soon.");
            } else if (choice.equals("5")) {
                System.out.println("Goodbye!");
                running = false;
            } else {
                System.out.println("Invalid option. Please choose 1 to 5.");
            }
        }

        input.close();
    }

    static void signIn(Scanner input) {
        System.out.print("Email address: ");
        String email = input.nextLine().trim();

        System.out.print("Password: ");
        String password = input.nextLine();

        System.out.print("Remember Me? (y/n): ");
        String remember = input.nextLine().trim();

        if (email.isEmpty() || password.isEmpty()) {
            System.out.println("Please enter your email and password.");
        } else if (!email.contains("@")) {
            System.out.println("Please enter a valid email address.");
        } else {
            System.out.println("Sign in design is working! Connect a backend to log in.");
            if (remember.equalsIgnoreCase("y")) {
                System.out.println("(Remember Me is on for " + email + ")");
            }
        }
    }
}
