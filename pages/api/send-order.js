export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { form, items, total } = req.body

  if (!form || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing data' })
  }

  const fmt = (p) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #e2e8f0;">
        ${item.name.slice(0, 60)}
        ${item.selectedSize ? `<br><span style="font-size:12px;color:#1a56db;font-weight:600;">Größe: ${item.selectedSize}</span>` : ''}
        ${item.selectedSize && item.sizes && item.sizes[item.selectedSize] === 'on_request'
          ? `<span style="font-size:12px;color:#f59e0b;margin-left:8px;">⏱ Auf Anfrage</span>` : ''}
      </td>
      <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;">${item.qty}</td>
      <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;">${fmt(item.new_price * item.qty)}</td>
    </tr>
  `).join('')

  const itemsText = items.map(item =>
    `• ${item.name.slice(0, 50)} x${item.qty}${item.selectedSize ? ` (Größe: ${item.selectedSize})` : ''} — ${fmt(item.new_price * item.qty)}`
  ).join('\n')

  // Письмо тебе с готовым шаблоном ответа
  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#0f172a;">
      <div style="background:linear-gradient(135deg,#0f172a,#1a56db);padding:28px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🛒 Neue Bestellung</h1>
        <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">velando24.de</p>
      </div>
      <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">

        <div style="background:#fff;border-radius:8px;padding:16px;margin-bottom:20px;border:1px solid #e2e8f0;">
          <p style="margin:4px 0;font-size:14px;"><strong>Name:</strong> ${form.vorname} ${form.nachname}</p>
          <p style="margin:4px 0;font-size:14px;"><strong>E-Mail:</strong> <a href="mailto:${form.email}" style="color:#1a56db;">${form.email}</a></p>
          ${form.telefon ? `<p style="margin:4px 0;font-size:14px;"><strong>Telefon:</strong> ${form.telefon}</p>` : ''}
          <p style="margin:4px 0;font-size:14px;"><strong>Adresse:</strong> ${form.strasse}, ${form.plz} ${form.stadt}</p>
        </div>

        <div style="background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;margin-bottom:20px;">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="background:#f1f5f9;">
              <th style="padding:10px;text-align:left;font-size:13px;color:#64748b;">Artikel</th>
              <th style="padding:10px;text-align:center;font-size:13px;color:#64748b;">Menge</th>
              <th style="padding:10px;text-align:right;font-size:13px;color:#64748b;">Preis</th>
            </tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr style="background:#eff6ff;">
              <td colspan="2" style="padding:14px;font-weight:700;font-size:16px;">Gesamt</td>
              <td style="padding:14px;font-weight:700;font-size:16px;text-align:right;color:#1a56db;">${fmt(total)}</td>
            </tr></tfoot>
          </table>
        </div>

        <!-- Шаблон для копирования -->
        <div style="background:#fff;border-radius:8px;border:2px dashed #1a56db;padding:20px;margin-bottom:16px;">
          <p style="margin:0 0 12px;font-weight:700;color:#1a56db;font-size:14px;">📋 Antwort-Vorlage — kopieren &amp; anpassen:</p>
          <div style="background:#f8fafc;border-radius:6px;padding:16px;font-size:13px;line-height:1.8;color:#334155;font-family:monospace;white-space:pre-wrap;">Sehr geehrte/r ${form.vorname} ${form.nachname},

vielen Dank für Ihre Bestellung bei Velando!

Ihre Bestellung:
${itemsText}

Gesamtbetrag: ${fmt(total)}

Bitte überweisen Sie den Betrag an:

🅿️ PayPal: [IHR PAYPAL HIER EINTRAGEN]
🏦 IBAN: [IHRE IBAN HIER EINTRAGEN]
   Verwendungszweck: Bestellung ${form.vorname} ${form.nachname}

Nach Zahlungseingang versenden wir Ihre Bestellung innerhalb von 1–2 Werktagen.

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen
Velando Shop
info@velando24.de
velando24.de</div>
        </div>

        <p style="font-size:12px;color:#94a3b8;text-align:center;margin:0;">
          Antworte direkt auf diese E-Mail — der Kunde antwortet auf <strong>${form.email}</strong>
        </p>
      </div>
    </div>
  `

  // Автоматическое подтверждение покупателю
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;">
      <div style="background:linear-gradient(135deg,#0f172a,#1a56db);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:24px;">✅ Bestellung erhalten</h1>
        <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;">Velando Shop</p>
      </div>
      <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
        <p style="font-size:15px;color:#334155;margin-bottom:20px;">
          Hallo <strong>${form.vorname}</strong>,<br><br>
          wir haben Ihre Bestellung erhalten und melden uns in Kürze mit den Zahlungsinformationen per E-Mail.
        </p>

        <div style="background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;margin-bottom:20px;">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="background:#f1f5f9;">
              <th style="padding:10px;text-align:left;font-size:13px;color:#64748b;">Artikel</th>
              <th style="padding:10px;text-align:center;font-size:13px;color:#64748b;">Menge</th>
              <th style="padding:10px;text-align:right;font-size:13px;color:#64748b;">Preis</th>
            </tr></thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot><tr style="background:#eff6ff;">
              <td colspan="2" style="padding:14px;font-weight:700;font-size:16px;">Gesamt</td>
              <td style="padding:14px;font-weight:700;font-size:16px;text-align:right;color:#1a56db;">${fmt(total)}</td>
            </tr></tfoot>
          </table>
        </div>

        <div style="background:#f0fdf4;border-radius:8px;padding:14px 16px;border:1px solid #bbf7d0;margin-bottom:16px;">
          <p style="margin:0;color:#16a34a;font-weight:600;font-size:14px;">🚚 Kostenloser Versand · Lieferung in 3–7 Werktagen</p>
        </div>

        <p style="font-size:13px;color:#64748b;text-align:center;margin:0;">
          Bei Fragen: <a href="mailto:info@velando24.de" style="color:#1a56db;">info@velando24.de</a><br>
          <a href="https://velando24.de" style="color:#1a56db;">velando24.de</a>
        </p>
      </div>
    </div>
  `

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Velando Shop <noreply@velando24.de>',
        to: ['info@velando24.de'],
        reply_to: form.email,
        subject: `🛒 Neue Bestellung — ${form.vorname} ${form.nachname} — ${fmt(total)}`,
        html: adminHtml
      })
    })

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Velando Shop <noreply@velando24.de>',
        to: [form.email],
        reply_to: 'info@velando24.de',
        subject: `✅ Bestellbestätigung — Velando Shop`,
        html: customerHtml
      })
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send error:', err.message)
    return res.status(500).json({ error: 'Server error' })
  }
}
