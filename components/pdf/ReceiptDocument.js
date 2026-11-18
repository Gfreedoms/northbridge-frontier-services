import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '@/lib/contact';
import { clientStatusLabel, serviceLabel } from '@/lib/services';

// Northbridge's own palette — mirrors app/styles/tokens.css so the PDF
// reads as the same product as the website. Do NOT reuse Colbis House's
// navy/blue/yellow.
const COLORS = {
  primary: '#BA0C2F',
  primaryDark: '#8F0924',
  tint: '#F6E3E7',
  ink: '#212529',
  muted: '#5B6770',
  surfaceMuted: '#F7F7F8',
  border: '#D8D9DB',
  success: '#1E8A4C',
  successTint: '#E3F3E9',
};

const STATUS_COLORS = {
  pending_assessment: { bg: '#FFF3CD', color: '#8A6D1B' },
  proposal_sent: { bg: '#E3ECFC', color: '#2E4F99' },
  agreed: { bg: '#E9E3FC', color: '#5B3FA0' },
  active: { bg: COLORS.tint, color: COLORS.primaryDark },
  completed: { bg: COLORS.successTint, color: COLORS.success },
  cancelled: { bg: '#EDEDED', color: '#6B6B6B' },
};

const styles = StyleSheet.create({
  page: { fontSize: 9.5, color: COLORS.ink, fontFamily: 'Helvetica' },
  topBar: { height: 8, backgroundColor: COLORS.primary },

  frame: {
    margin: 22,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    padding: 24,
  },

  // Dateline header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  monogramRow: { flexDirection: 'row', alignItems: 'center' },
  monogram: { width: 30, height: 30, borderRadius: 5, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  monogramText: { color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 0.3 },
  companyName: { fontSize: 10.5, fontWeight: 700, color: COLORS.ink, letterSpacing: 0.2 },
  companyTagline: { fontSize: 6.5, color: COLORS.muted, letterSpacing: 0.4, marginTop: 2, textTransform: 'uppercase' },
  dateBlock: { alignItems: 'flex-end' },
  dateLabel: { fontSize: 6.5, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  dateValue: { fontSize: 9, fontWeight: 700, color: COLORS.ink, marginTop: 2 },

  headerRule: { height: 1.2, backgroundColor: COLORS.primary, marginTop: 12, marginBottom: 16 },

  // Hero title
  heroWrap: { alignItems: 'center', marginBottom: 14 },
  heroEyebrow: { fontSize: 7.5, color: COLORS.primaryDark, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 },
  heroTitle: { fontSize: 19, fontWeight: 700, color: COLORS.ink, letterSpacing: 0.5, marginTop: 5, textTransform: 'uppercase' },
  heroRule: { width: 36, height: 2, backgroundColor: COLORS.primary, marginTop: 8, marginBottom: 8 },
  heroSubtitle: { fontSize: 8.5, color: COLORS.muted, textAlign: 'center', maxWidth: 380, lineHeight: 1.35 },

  // Info strip
  infoStrip: { flexDirection: 'row', borderWidth: 1, borderColor: COLORS.border, borderRadius: 3, marginBottom: 18 },
  infoStripItem: { flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 6 },
  infoStripDivider: { width: 1, backgroundColor: COLORS.border },
  infoStripLabel: { fontSize: 6.5, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 5 },
  infoStripValue: { fontSize: 11, fontWeight: 700, color: COLORS.ink },
  statusPill: { borderRadius: 9, paddingVertical: 3, paddingHorizontal: 10 },
  statusPillText: { fontSize: 8.5, fontWeight: 700, textTransform: 'capitalize' },

  // Numbered sections
  section: { marginBottom: 14 },
  sectionHeadingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  sectionNumberBadge: { width: 16, height: 16, borderRadius: 3, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  sectionNumberText: { fontSize: 8, fontWeight: 700, color: '#fff' },
  sectionHeadingText: { fontSize: 9.5, fontWeight: 700, color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.7 },

  table: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 2 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tableRowLast: { borderBottomWidth: 0 },
  tableRowAlt: { backgroundColor: COLORS.surfaceMuted },
  tableLabelCell: { width: '34%', paddingVertical: 6, paddingHorizontal: 10, borderRightWidth: 1, borderRightColor: COLORS.border, justifyContent: 'center' },
  tableLabelText: { fontSize: 7.5, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.3 },
  tableValueCell: { flex: 1, paddingVertical: 6, paddingHorizontal: 10, justifyContent: 'center' },
  tableValueText: { fontSize: 9, fontWeight: 700, color: COLORS.ink },

  // Terms box
  termsBox: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 2, padding: 11 },
  termsHeading: { fontSize: 8, fontWeight: 700, color: COLORS.primaryDark, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 },
  termsText: { fontSize: 8.5, lineHeight: 1.5, color: COLORS.ink, textAlign: 'justify' },

  // Signatures + verification
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  sigBlock: { width: '31%' },
  sigBlockTitle: { fontSize: 7.5, fontWeight: 700, color: COLORS.ink, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 },
  sigLineRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 },
  sigLineLabel: { fontSize: 7.5, color: COLORS.muted, width: 46 },
  sigLineBlank: { flex: 1, borderBottomWidth: 1, borderBottomColor: COLORS.muted, height: 11 },

  verifyBox: { width: '31%', borderWidth: 1, borderStyle: 'dashed', borderColor: COLORS.border, borderRadius: 3, padding: 9, alignItems: 'center' },
  verifyTitle: { fontSize: 7, fontWeight: 700, color: COLORS.primaryDark, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 7 },
  qrImage: { width: 58, height: 58 },
  verifyCode: { fontSize: 7.5, fontWeight: 700, color: COLORS.ink, marginTop: 7 },
  verifyCaption: { fontSize: 6, color: COLORS.muted, marginTop: 3, textAlign: 'center' },

  // Footer — normal in-flow content at the end of the frame. (A `fixed`
  // page-level footer sounds nicer for multi-page docs, but it pushed
  // react-pdf's pagination estimate into spawning a phantom near-empty
  // trailing page even when everything actually fit on page one.)
  footerRule: { height: 1, backgroundColor: COLORS.border, marginTop: 16, marginBottom: 6 },
  footerLine: { fontSize: 7.5, color: COLORS.muted, textAlign: 'center' },
  footerNote: { fontSize: 6.5, color: COLORS.muted, textAlign: 'center', marginTop: 3, fontStyle: 'italic' },
});

const DOC_TYPE_TITLE = {
  custody_receipt: 'Custody Receipt',
  service_confirmation: 'Service Confirmation',
};

const DOC_TYPE_SUBTITLE = {
  custody_receipt:
    'This document certifies that the goods described below have been received into the custody of Northbridge Frontier Services Ltd under the terms stated.',
  service_confirmation:
    'This document confirms the service particulars agreed between the client and Northbridge Frontier Services Ltd as described below.',
};

function Header({ issuedDate }) {
  return (
    <>
      <View style={styles.headerRow}>
        <View style={styles.monogramRow}>
          <View style={styles.monogram}>
            <Text style={styles.monogramText}>NB</Text>
          </View>
          <View>
            <Text style={styles.companyName}>{COMPANY_NAME}</Text>
            <Text style={styles.companyTagline}>Security Services — Kampala, Uganda</Text>
          </View>
        </View>
        <View style={styles.dateBlock}>
          <Text style={styles.dateLabel}>Date Issued</Text>
          <Text style={styles.dateValue}>{issuedDate}</Text>
        </View>
      </View>
      <View style={styles.headerRule} />
    </>
  );
}

function HeroTitle({ docType }) {
  return (
    <View style={styles.heroWrap}>
      <Text style={styles.heroEyebrow}>Official Document</Text>
      <Text style={styles.heroTitle}>{DOC_TYPE_TITLE[docType]}</Text>
      <View style={styles.heroRule} />
      <Text style={styles.heroSubtitle}>{DOC_TYPE_SUBTITLE[docType]}</Text>
    </View>
  );
}

function InfoStrip({ record, thirdColumn }) {
  const statusColors = STATUS_COLORS[record.status] || STATUS_COLORS.pending_assessment;
  return (
    <View style={styles.infoStrip}>
      <View style={styles.infoStripItem}>
        <Text style={styles.infoStripLabel}>Tracking Number</Text>
        <Text style={styles.infoStripValue}>{record.tracking_number}</Text>
      </View>
      <View style={styles.infoStripDivider} />
      <View style={styles.infoStripItem}>
        <Text style={styles.infoStripLabel}>Status</Text>
        <View style={[styles.statusPill, { backgroundColor: statusColors.bg }]}>
          <Text style={[styles.statusPillText, { color: statusColors.color }]}>
            {clientStatusLabel(record.status, record.service_type)}
          </Text>
        </View>
      </View>
      <View style={styles.infoStripDivider} />
      <View style={styles.infoStripItem}>
        <Text style={styles.infoStripLabel}>{thirdColumn.label}</Text>
        <Text style={styles.infoStripValue}>{thirdColumn.value}</Text>
      </View>
    </View>
  );
}

function SectionTable({ number, title, rows }) {
  const visibleRows = rows.filter(([, value]) => value);
  if (visibleRows.length === 0) return null;
  return (
    <View style={styles.section} wrap={false}>
      <View style={styles.sectionHeadingRow}>
        <View style={styles.sectionNumberBadge}>
          <Text style={styles.sectionNumberText}>{number}</Text>
        </View>
        <Text style={styles.sectionHeadingText}>{title}</Text>
      </View>
      <View style={styles.table}>
        {visibleRows.map(([label, value], i) => (
          <View
            key={label}
            style={[
              styles.tableRow,
              i % 2 === 1 && styles.tableRowAlt,
              i === visibleRows.length - 1 && styles.tableRowLast,
            ]}
          >
            <View style={styles.tableLabelCell}>
              <Text style={styles.tableLabelText}>{label}</Text>
            </View>
            <View style={styles.tableValueCell}>
              <Text style={styles.tableValueText}>{value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function TermsBox({ heading, children }) {
  return (
    <View style={styles.termsBox} wrap={false}>
      <Text style={styles.termsHeading}>{heading}</Text>
      <Text style={styles.termsText}>{children}</Text>
    </View>
  );
}

function SignatureBlock({ title }) {
  return (
    <View style={styles.sigBlock}>
      <Text style={styles.sigBlockTitle}>{title}</Text>
      <View style={styles.sigLineRow}>
        <Text style={styles.sigLineLabel}>Name</Text>
        <View style={styles.sigLineBlank} />
      </View>
      <View style={styles.sigLineRow}>
        <Text style={styles.sigLineLabel}>Signature</Text>
        <View style={styles.sigLineBlank} />
      </View>
      <View style={styles.sigLineRow}>
        <Text style={styles.sigLineLabel}>Date</Text>
        <View style={styles.sigLineBlank} />
      </View>
    </View>
  );
}

function VerificationBox({ record, qrDataUrl }) {
  return (
    <View style={styles.verifyBox}>
      <Text style={styles.verifyTitle}>Official Verification</Text>
      {qrDataUrl && <Image src={qrDataUrl} style={styles.qrImage} />}
      <Text style={styles.verifyCode}>{record.tracking_number}</Text>
      <Text style={styles.verifyCaption}>Scan to verify this document&apos;s status online</Text>
    </View>
  );
}

function Footer() {
  return (
    <View wrap={false}>
      <View style={styles.footerRule} />
      <Text style={styles.footerLine}>
        {COMPANY_NAME} · {CONTACT_PHONE_DISPLAY} · {CONTACT_EMAIL}
      </Text>
      <Text style={styles.footerNote}>
        This is a system-generated document issued by {COMPANY_NAME}. No signature is required
        for validity unless stated above.
      </Text>
    </View>
  );
}

export function CustodyReceipt({ record, client, qrDataUrl }) {
  const d = record.details || {};
  const issuedDate = new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.frame}>
          <Header issuedDate={issuedDate} />
          <HeroTitle docType="custody_receipt" />
          <InfoStrip record={record} thirdColumn={{ label: 'Consignment Ref.', value: d.consignment_ref || '—' }} />

          <SectionTable
            number="1"
            title="Depositor Information"
            rows={[
              ['Full Name', client.full_name],
              ['Phone', client.phone],
              ['Identification', `${client.id_type?.replace('_', ' ')} — ${client.id_number}`],
              ['Email', client.email],
              ['Address', client.address],
            ]}
          />

          <SectionTable
            number="2"
            title="Goods in Custody"
            rows={[
              ['Commodity / Description', d.commodity],
              ['Quantity', d.quantity],
              ['Declared Value', d.declared_value],
              ['Charge Rate', d.charge_rate],
              ['Storage Start', d.storage_start_date],
              ['Storage End', d.storage_end_date],
              ['Release Authorised To', d.release_authorized_persons],
              ['Insurance Notes', d.insurance_notes],
            ]}
          />

          <View style={{ marginBottom: 16 }} wrap={false}>
            <View style={styles.sectionHeadingRow}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>3</Text>
              </View>
              <Text style={styles.sectionHeadingText}>Terms of Custody</Text>
            </View>
            <TermsBox heading="Custody Statement">
              The above-described goods have been received into {COMPANY_NAME}&apos;s custody
              under the terms agreed with the depositor at the time of registration. This receipt
              confirms custody only and does not constitute a valuation or insurance certificate
              unless separately stated above. The goods will be released only to the person(s)
              authorised above, upon presentation of this receipt or the tracking number together
              with valid identification. {COMPANY_NAME} shall not be liable for loss or damage
              arising from inaccurate description of the goods by the depositor.
            </TermsBox>
          </View>

          <View style={styles.bottomRow} wrap={false}>
            <SignatureBlock title="Depositor" />
            <SignatureBlock title={`Authorised Officer\n— ${COMPANY_NAME}`} />
            <VerificationBox record={record} qrDataUrl={qrDataUrl} />
          </View>

          <Footer />
        </View>
      </Page>
    </Document>
  );
}

const SUMMARY_FIELDS = {
  home_residential_security: [['property_address', 'Property Address'], ['property_type', 'Property Type'], ['duty_schedule', 'Duty Schedule'], ['guards_assigned', 'Guards Assigned'], ['start_date', 'Start Date'], ['special_instructions', 'Special Instructions']],
  corporate_commercial_security: [['premises_address', 'Premises Address'], ['premises_type', 'Premises Type'], ['duty_schedule', 'Duty Schedule'], ['entry_points_covered', 'Entry/Exit Points'], ['guards_assigned', 'Guards Assigned'], ['start_date', 'Start Date']],
  cctv_installation: [['site_address', 'Site Address'], ['camera_count', 'Number of Cameras'], ['coverage_areas', 'Coverage Areas'], ['system_type', 'System Type / Options'], ['install_date', 'Install Date'], ['maintenance_terms', 'Maintenance Terms']],
  security_escorts: [['goods_description', 'Goods / Assets'], ['origin', 'Origin'], ['destination', 'Destination'], ['escort_date', 'Escort Date'], ['personnel_assigned', 'Personnel Assigned'], ['vehicle_ref', 'Vehicle Ref.'], ['scope', 'Scope']],
  security_dogs: [['site_address', 'Site Address'], ['handler_assigned', 'Handler Assigned'], ['dog_ref', 'Dog Reference'], ['patrol_areas', 'Patrol Areas'], ['deployment_schedule', 'Deployment Schedule']],
};

export function ServiceConfirmation({ record, client, qrDataUrl }) {
  const d = record.details || {};
  const fields = SUMMARY_FIELDS[record.service_type] || [];
  const issuedDate = new Date(record.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.frame}>
          <Header issuedDate={issuedDate} />
          <HeroTitle docType="service_confirmation" />
          <InfoStrip record={record} thirdColumn={{ label: 'Service Type', value: serviceLabel(record.service_type) }} />

          <SectionTable
            number="1"
            title="Client Information"
            rows={[
              ['Full Name', client.full_name],
              ['Phone', client.phone],
              ['Identification', `${client.id_type?.replace('_', ' ')} — ${client.id_number}`],
              ['Email', client.email],
              ['Address', client.address],
            ]}
          />

          <SectionTable number="2" title={serviceLabel(record.service_type)} rows={fields.map(([key, label]) => [label, d[key]])} />

          <View style={{ marginBottom: 16 }} wrap={false}>
            <View style={styles.sectionHeadingRow}>
              <View style={styles.sectionNumberBadge}>
                <Text style={styles.sectionNumberText}>3</Text>
              </View>
              <Text style={styles.sectionHeadingText}>Terms of Service</Text>
            </View>
            <TermsBox heading="Confirmation Statement">
              This document confirms the service particulars above as agreed between the client
              and {COMPANY_NAME}. Any change to schedule, personnel, or scope will be reflected in
              an updated confirmation superseding this one. For any query regarding this service,
              please quote the tracking number shown above when contacting our office.
            </TermsBox>
          </View>

          <View style={styles.bottomRow} wrap={false}>
            <SignatureBlock title="Client" />
            <SignatureBlock title={`Authorised Officer\n— ${COMPANY_NAME}`} />
            <VerificationBox record={record} qrDataUrl={qrDataUrl} />
          </View>

          <Footer />
        </View>
      </Page>
    </Document>
  );
}

export function receiptDocumentFor(docType, props) {
  return docType === 'custody_receipt' ? <CustodyReceipt {...props} /> : <ServiceConfirmation {...props} />;
}
