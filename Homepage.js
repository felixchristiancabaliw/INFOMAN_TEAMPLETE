import java.util.Scanner;

// HOPE, Inc. ERP - Homepage 
public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        boolean running = true;

        showHomepage();

        while (running) {
            System.out.println();
            System.out.println("1. Sign In to dashboard");
            System.out.println("2. Register");
            System.out.println("3. Workspace overview");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            if (choice.equals("1")) {
                System.out.println("Opening the sign in page...");
            } else if (choice.equals("2")) {
                System.out.println("Opening the register page...");
            } else if (choice.equals("3")) {
                showOverview();
            } else if (choice.equals("4")) {
                System.out.println("Goodbye!");
                running = false;
            } else {
                System.out.println("Invalid option. Please choose 1 to 4.");
            }
        }

        showFooter();
        input.close();
    }

    static void showHomepage() {
        System.out.println("==============================================");
        System.out.println(" H  HOPE, Inc. ERP            [Sign In] [Register]");
        System.out.println("==============================================");
        System.out.println();
        System.out.println("A simpler way to stay organized.");
        System.out.println();
        System.out.println("Manage Your Business,");
        System.out.println("Made Simple.");
        System.out.println();
        System.out.println("Hope, Inc. ERP helps you manage customers, products, employees,");
        System.out.println("and sales through one simple and convenient platform.");
        System.out.println("Stay organized, track your business activities, and manage");
        System.out.println("your daily operations with ease.");
    }

    static void showOverview() {
        System.out.println();
        System.out.println("Workspace overview            HOPE, Inc. ERP Dashboard");
        System.out.println("----------------------------------------------");
        System.out.println("Customers       : Manage contacts & accounts");
        System.out.println("Products        : Catalog & inventory");
        System.out.println("Human Resources : Employees & payroll");
        System.out.println("Sales           : Orders & revenue");
    }

    static void showFooter() {
        System.out.println();
        System.out.println("(c) 2026 Hope, Inc. ERP System - All rights reserved");
    }
}
