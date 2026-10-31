import java.util.Scanner;

// Hope, Inc. ERP - Dashboard page 
public class Main {

    static String userName = "User";
    static String userRole = "USER";

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean running = true;

        showDashboard();

        while (running) {
            System.out.println();
            System.out.println("Modules");
            System.out.println("1. Dashboard");
            System.out.println("2. Customers");
            System.out.println("3. Products");
            System.out.println("4. Sales");
            System.out.println("5. Reports");
            System.out.println("6. Human Resources");
            System.out.println("7. Logout");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            if (choice.equals("1")) {
                showDashboard();
            } else if (choice.equals("2")) {
                System.out.println("Customers module coming soon.");
            } else if (choice.equals("3")) {
                System.out.println("Products module coming soon.");
            } else if (choice.equals("4")) {
                System.out.println("Sales module coming soon.");
            } else if (choice.equals("5")) {
                System.out.println("Reports module coming soon.");
            } else if (choice.equals("6")) {
                System.out.println("Human Resources module coming soon.");
            } else if (choice.equals("7")) {
                System.out.print("Are you sure you want to log out? (y/n): ");
                String answer = input.nextLine().trim();
                if (answer.equalsIgnoreCase("y")) {
                    System.out.println("Logged out. Going back to the sign in page.");
                    running = false;
                }
            } else {
                System.out.println("Invalid option. Please choose 1 to 7.");
            }
        }

        input.close();
    }

    static void showDashboard() {
        System.out.println();
        System.out.println("=====================================");
        System.out.println(" Hope, Inc. ERP            Dashboard");
        System.out.println(" " + userName + " (" + userRole + ")");
        System.out.println("=====================================");

        System.out.println();
        System.out.println("Welcome back, " + userName + "!");
        System.out.println("You have access to the core modules assigned to you.");
        System.out.println("Contact an Admin for elevated permissions.");

        System.out.println();
        System.out.println("Summary");
        System.out.println("-------------------------------------");
        System.out.println("Total Customers : 5     (1 inactive)");
        System.out.println("Products        : 400   (7 new this week)");
        System.out.println("Open Orders     : 100   (up 10% vs last week)");
        System.out.println("Revenue (MTD)   : $99.1k (up 20% vs last month)");

        System.out.println();
        System.out.println("Quick Actions");
        System.out.println("-------------------------------------");
        System.out.println("View Customers | Manage Products | Human Resources");
        System.out.println("Sales Pipeline | Reports");
    }
}
