package org.shehacks.database;

import java.sql.*;

import static java.sql.DriverManager.getConnection;

public class Database {

    public static void connectDatabase(String DISK_DB_URL) {
        try (final Connection connection = DriverManager.getConnection(DISK_DB_URL)) {
            System.out.println("Connected to database ");
            createTable(connection);

        } catch ( SQLException e ) {
            System.err.println( e.getMessage() );
        }
    }

    public static void createTable(Connection connection){
        try (final Statement stmt = connection.createStatement()) {
            stmt.execute("CREATE TABLE IF NOT EXISTS history (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "cellphone TEXT NOT NULL," +
                    "amount FLOAT NOT NULL," +
                    "date TEXT NOT NULL," +
                    "points INTEGER NOT NULL," +
                    "status TEXT NOT NULL);");
        } catch (SQLException e) {
            System.err.println( e.getMessage() );
        }
    }

}



