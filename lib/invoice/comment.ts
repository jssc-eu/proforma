import getTaxComment from 'lib/tax/comment';
import dedent from 'dedent';
export default function invoiceComment(partner, items, paid, config): string {
  return dedent`
    ${getTaxComment(partner, items)}
    ${paid ? 'Paid in full.' : ''}
    ${config.invoice.comment}
  `;
}
