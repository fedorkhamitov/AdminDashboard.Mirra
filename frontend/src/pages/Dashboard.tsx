import { useState, useEffect } from "react";
import type { Client, ExchangeRate, Payment } from "../types";
import { fetchClients } from "../api/clients/api";
import { fetchPayments } from "../api/payments/api";
import { fetchRate, updateRate } from "../api/rate/api";

const DashboardPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [rate, setRate] = useState<ExchangeRate>();
  const [newRate, setNewRate] = useState<string>("");
  const [rateError, setRateError] = useState<string | null>(null);
  const [rateSuccess, setRateSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([fetchClients(), fetchPayments(), fetchRate()])
      .then(([clientsData, paymentsData, rateData]) => {
        if (!clientsData || !paymentsData || !rateData) {
          throw new Error("No data");
        }
        setClients(clientsData);
        setPayments(paymentsData);
        setRate(rateData);
      })
      .catch(() => setError("Ошибка при загрузке данных"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericRate = parseFloat(newRate);
    if (isNaN(numericRate)) {
      setRateError("Please, enter valid number");
      return;
    }
    try {
      setIsLoading(true);
      await updateRate({ rate: numericRate });
      setRate({ rate: numericRate });
      setRateSuccess("Rate успешно обновлён");
      setRateError(null);
      setNewRate("");
      setTimeout(() => setRateSuccess(null), 3000);
    } catch {
      setRateError("Ошибка при обновлении курса");
      setRateSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="container border shadow-sm m-2">
        <div className="card-body">
          <h5 className="card-title mb-3">Управление курсом валюты</h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="text-muted">Текущий курс:</span>
              <span className="ms-2 fs-4 fw-bold text-primary">
                {rate?.rate.toFixed(2)} ₽
              </span>
            </div>
            <form onSubmit={handleRateUpdate} className="d-flex gap-2">
              <div className="input-group" style={{ maxWidth: "200px" }}>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Новый курс"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                />
                <span className="input-group-text">₽</span>
              </div>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={!newRate}
              >
                Обновить
              </button>
            </form>
          </div>
          {rateError && (
            <div className="alert alert-danger mt-2">{rateError}</div>
          )}
          {rateSuccess && (
            <div className="alert alert-success mt-2">{rateSuccess}</div>
          )}
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <h2 className="mb-4 text-center">Клиенты</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          {isLoading && <div className="spinner-border text-primary"></div>}
          <table className="table table-hover table-bordered align-middle shadow-sm">
            <thead className="table-primary">
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Имя</th>
                <th scope="col" className="text-end">
                  Сумма платежей
                </th>
                <th scope="col" className="text-end">
                  Сумма платежей в валюте
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const totalAmountRub = payments
                  .filter((p) => p.clientId === client.id)
                  .reduce((sum, p) => sum + p.amount, 0);
                const totalAmountCurrency =
                  rate && rate.rate ? totalAmountRub / rate.rate : 0;
                return (
                  <tr key={client.id}>
                    <td>{client.email}</td>
                    <td>{client.name}</td>
                    <td className="text-end fw-bold text-success">
                      {totalAmountRub.toLocaleString("ru-RU", {
                        style: "currency",
                        currency: "RUB",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {totalAmountCurrency.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
