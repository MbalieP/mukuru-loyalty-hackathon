package org.shehacks.database;

import net.lemnik.eodsql.BaseQuery;
import net.lemnik.eodsql.Select;
import net.lemnik.eodsql.Update;

import java.util.List;

public interface HistoryDAI extends BaseQuery {

    @Select(
            "SELECT id, cellphone, amount, date, points, status "
            +"FROM history WHERE history.cellphone = ?{1}"
    )
    List<HistoryDO> getTransactionHistory(String cellphone);

    @Update(
            "INSERT INTO history (cellphone, amount, date, points, status) "
            +"VALUES (?{1.cellphone}, ?{1.amount}, ?{1.date}, ?{1.points}, ?{1.status})"
    )
    void addTransaction(HistoryDO transaction);
}
