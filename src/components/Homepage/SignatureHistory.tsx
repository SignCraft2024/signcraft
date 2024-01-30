import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import  { useState, useEffect } from "react";
import "../../styles/SignatureHistory.css";

interface Signature {
  id: number;
  documentName: string;
  date: string;
  status: string;
}

interface SignatureHistoryProps {
  userId: number;
}

// eslint-disable-next-line react/prop-types
const SignatureHistory: React.FC<SignatureHistoryProps> = ({ userId }) => {
  const [signatures, setSignatures] = useState<Signature[]>([]);

  useEffect(() => {
    const fetchSignatures = async () => {
      const firebaseConfig = {
        //  configuration Firebase
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const signaturesSnapshot = await getDocs(collection(db, `signatures/${userId}`));
      const signatures = signaturesSnapshot.docs.map((doc) => ({
        id: Number(doc.id),
        documentName: doc.data().documentName,
        date: doc.data().date,
        status: doc.data().status,
      }));
      setSignatures(signatures);
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
