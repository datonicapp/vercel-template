import { db } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic"; // לוודא שהדף מתעדכן

export default async function DashboardPage() {
  // קריאה ל-Firestore בצד השרת
  const listingsSnap = await db
    .collection("listings")
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  const searchSnap = await db
    .collection("searchRequests")
    .orderBy("createdAt", "desc")
    .limit(50)
    .get();

  const listings = listingsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  const searches = searchSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return (
    <main style={{ padding: 20 }}>
      <h1>Real Estate AI Dashboard</h1>

      <section style={{ marginTop: 30 }}>
        <h2>כרטיסיות דירות (Listings)</h2>
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>סוג</th>
              <th>אימייל</th>
              <th>עיר</th>
              <th>כתובת</th>
              <th>חדרים</th>
              <th>מחיר</th>
              <th>סטטוס</th>
              <th>שדות חסרים</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.type}</td>
                <td>{l.from}</td>
                <td>{l.extracted?.city || "-"}</td>
                <td>{l.extracted?.address || "-"}</td>
                <td>{l.extracted?.rooms ?? "-"}</td>
                <td>{l.extracted?.price ?? "-"}</td>
                <td>{l.status}</td>
                <td>{(l.missing || []).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>בקשות חיפוש (Search Requests)</h2>
        <table border="1" cellPadding="6" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>אימייל</th>
              <th>עיר</th>
              <th>חדרים</th>
              <th>תקציב</th>
              <th>סטטוס</th>
              <th>התאמות (matches)</th>
            </tr>
          </thead>
          <tbody>
            {searches.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.from}</td>
                <td>{s.criteria?.city || "-"}</td>
                <td>{s.criteria?.rooms ?? "-"}</td>
                <td>{s.criteria?.price ?? "-"}</td>
                <td>{s.status}</td>
                <td>{(s.matches || []).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
