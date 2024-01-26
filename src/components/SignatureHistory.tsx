import  { useState, useEffect } from "react";

interface Signature {
  id: number;
  documentName: string;
  date: string;
  status: string;
}

interface SignatureHistoryProps {
  userId: number;
}

const SignatureHistory: React.FC<SignatureHistoryProps> = ({ userId }) => {
  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: 1,
      documentName: "Contrat de location",
      date: "25/01/2024",
      status: "Signé",
    },
    {
      id: 2,
      documentName: "Accord de confidentialité",
      date: "20/01/2024",
      status: "En attente",
    },
  ]);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await fetch(`/api/signatures?userId=${userId}`);
        const data = await response.json();
        setSignatures(data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des signatures", error);
      }
    };

    fetchSignatures();
  }, [userId]);

  return (
    <div>
      <h2>Historique des signatures</h2>
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {signatures.map((signature) => (
            <tr key={signature.id}>
              <td>{signature.documentName}</td>
              <td>{signature.date}</td>
              <td>{signature.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SignatureHistory;