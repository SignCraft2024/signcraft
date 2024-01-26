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
  const [signatures, setSignatures] = useState<Signature[]>([]);

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
      <ul>
        {signatures.map((signature) => (
          <li key={signature.id}>
            Document : {signature.documentName}, Date : {signature.date}, Statut : {signature.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignatureHistory;
