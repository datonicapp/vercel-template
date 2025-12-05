import { db } from "../../lib/firebase";

export const dynamic = "force-dynamic"; // כדי ש-Vercel ירנדר כל פעם

export default async function DashboardPage() {
  const docsSnapshot = await db.collection("requests").orderBy("createdAt", "desc").get();
  const items = docsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        ניהול מערכת – דשבורד
      </h1>

      {items.length === 0 ? (
        <p>אין עדיין בקשות במערכת.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map(item => (
            <li key={item.id}
                style={{
                  marginBottom: "20px",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px"
                }}>
              
              <h3 style={{ marginBottom: "10px" }}>בקשה #{item.id}</h3>

              <p><b>סוג:</b> {item.type}</p>
              <p><b>אימייל לקוח:</b> {item.email}</p>
              <p><b>סטטוס:</b> {item.status}</p>

              {item.pdfUrl && (
                <p>
                  <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                    הורדת PDF
                  </a>
                </p>
              )}

              <p><b>תאריך:</b> {new Date(item.createdAt).toLocaleString()}</p>

            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
