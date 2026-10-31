import java.util.Scanner;

// Hope, Inc. ERP - Register page
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean running = true;

        System.out.println("=================================");
        System.out.println("       Create an account");
        System.out.println("        Join Hope, Inc. ERP");
        System.out.println("=================================");

        while (running) {
            System.out.println();
            System.out.println("1. Register");
            System.out.println("2. Continue with Google");
            System.out.println("3. Already have an account? Sign In");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            if (choice.equals("1")) {
                register(input);
            } else if (choice.equals("2")) {
                System.out.println("Google sign-in requires authentication setup.");
            } else if (choice.equals("3")) {
                System.out.println("Sign in page coming soon.");
            } else if (choice.equals("4")) {
                System.out.println("Goodbye!");
                running = false;
            } else {
                System.out.println("Invalid option. Please choose 1 to 4.");
            }
        }

        input.close();
    }

    static void register(Scanner input) {
        System.out.print("First name: ");
        String firstName = input.nextLine().trim();

        System.out.print("Last name: ");
        String lastName = input.nextLine().trim();

        System.out.print("Email Address: ");
        String email = input.nextLine().trim();

        System.out.print("Password (at least 8 characters): ");
        String password = input.nextLine();

        if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() || password.isEmpty()) {
            System.out.println("Please fill in all fields.");
        } else if (!email.contains("@")) {
            System.out.println("Please enter a valid email address.");
        } else if (password.length() < 8) {
            System.out.println("Password must be at least 8 characters.");
        } else {
            System.out.println("Registration submitted. Connect your backend to create an account.");
            System.out.println("Name: " + firstName + " " + lastName);
            System.out.println("Email: " + email);
        }
    }
}
