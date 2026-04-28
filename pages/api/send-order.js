export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { form, items, total } = req.body

  if (!form || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing data' })
  }

  // Формируем список товаров для письма
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
        ${item.name.slice(0, 60)}
        ${item.selectedSize ? `<br><span style="font-size:12px;color:#1a56db;">Größe: ${item.selectedSize}</span>` : ''}
        ${item.selectedSize && item.sizes && item.sizes[item.selectedSize] === 'on_request'
          ? `<span style="font-size:12px;color:#f59e0b;margin-left:8px;">⏱ Auf Anfrage</span>`
          : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align:center;">${item.qty}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align:right; font-weight:600;">
        ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.new_price * item.qty)}
      </td>
    </tr>
  `).join('')

  const totalFormatted = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(total)

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
      <div style="background: linear-gradient(135deg, #0f172a, #1a56db); padding: 32px; border-radius: 12px 12px 0 0; text-align:center;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">🛒 Neue Bestellung</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0;">velando24.de</p>
      </div>

      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">

        <h2 style="font-size: 16px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Kundendaten</h2>
        <div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${form.vorname} ${form.nachname}</p>
          <p style="margin: 4px 0;"><strong>E-Mail:</strong> <a href="mailto:${form.email}">${form.email}</a></p>
          ${form.telefon ? `<p style="margin: 4px 0;"><strong>Telefon:</strong> ${form.telefon}</p>` : ''}
          <p style="margin: 4px 0;"><strong>Adresse:</strong> ${form.strasse}, ${form.plz} ${form.stadt}</p>
        </div>

        <h2 style="font-size: 16px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Bestellte Artikel</h2>
        <div style="background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f1f5f9;">
                <th style="padding: 10px; text-align:left; font-size:13px; color:#64748b;">Artikel</th>
                <th style="padding: 10px; text-align:center; font-size:13px; color:#64748b;">Menge</th>
                <th style="padding: 10px; text-align:right; font-size:13px; color:#64748b;">Preis</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 14px; font-weight:700; font-size:16px;">Gesamt</td>
                <td style="padding: 14px; font-weight:700; font-size:16px; text-align:right; color:#1a56db;">${totalFormatted}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style="background: #f0fdf4; border-radius: 8px; padding: 12px 16px; border: 1px solid #bbf7d0;">
          <p style="margin: 0; color: #16a34a; font-weight: 600; font-size: 14px;">✓ Kostenloser Versand inklusive</p>
        </div>

        ${items.some(i => i.selectedSize && i.sizes && i.sizes[i.selectedSize] === 'on_request') ? `
        <div style="background: #fffbeb; border-radius: 8px; padding: 12px 16px; border: 1px solid #fcd34d; margin-top: 12px;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">⏱ Einige Artikel sind auf Anfrage — bitte Lieferzeit mit Kunden abstimmen.</p>
        </div>` : ''}
      </div>

      <p style="text-align:center; color:#94a3b8; font-size:12px; margin-top:16px;">
        Velando24.de · info@velando24.de
      </p>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Velando Shop <onboarding@resend.dev>',
        to: ['info@velando24.de'],
        subject: `🛒 Neue Bestellung von ${form.vorname} ${form.nachname} — ${totalFormatted}`,
        html
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Email failed' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Send error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
