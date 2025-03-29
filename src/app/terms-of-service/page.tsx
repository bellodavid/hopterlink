export default function Page() {
  return (
    // Main container with padding, rounded corners, shadow and a fade-in animation for smooth UX
    <div className="p-6 rounded-md shadow animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      {/* Section 1: Introduction */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">1. Introduction</h2>
        <p>
          Welcome to HOPTERLINK! These Terms of Service (“Terms”) govern your
          use of our platform, mobile application, and services. By accessing or
          using HOPTERLINK, you agree to these Terms.
        </p>
      </section>

      {/* Section 2: Eligibility */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">2. Eligibility</h2>
        <p>
          You must be at least 16 years old or have parental consent to use
          HOPTERLINK. By using our platform, you confirm that you meet these
          requirements.
        </p>
      </section>

      {/* Section 3: Account Registration */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          3. Account Registration
        </h2>
        <ul className="list-disc list-inside">
          <li>To access certain features, you must create an account.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>Any activity under your account is your responsibility.</li>
        </ul>
      </section>

      {/* Section 4: Services Offered */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          4. Services Offered
        </h2>
        <p>
          HOPTERLINK connects vendors and users for seamless transactions.
          Vendors are responsible for fulfilling their services, and users are
          responsible for their orders.
        </p>
      </section>

      {/* Section 5: Payments & Transactions */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          5. Payments & Transactions
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Payments are securely processed through third-party payment
            gateways.
          </li>
          <li>
            HOPTERLINK is not liable for disputes between users and vendors but
            will facilitate resolutions where possible.
          </li>
        </ul>
      </section>

      {/* Section 6: User Responsibilities */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          6. User Responsibilities
        </h2>
        <ul className="list-disc list-inside">
          <li>Provide accurate and updated information.</li>
          <li>Abide by all applicable laws and regulations.</li>
          <li>Not engage in fraudulent or illegal activities.</li>
        </ul>
      </section>

      {/* Section 7: Vendor Responsibilities */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          7. Vendor Responsibilities
        </h2>
        <ul className="list-disc list-inside">
          <li>Ensure the accuracy of their service listings.</li>
          <li>Provide high-quality services as described.</li>
          <li>Maintain compliance with HOPTERLINK’s standards.</li>
        </ul>
      </section>

      {/* Section 8: Dispute Resolution */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          8. Dispute Resolution
        </h2>
        <p>
          If a dispute arises between a vendor and a user, both parties should
          attempt to resolve it directly. If unresolved, HOPTERLINK may
          intervene.
        </p>
      </section>

      {/* Section 9: Termination of Accounts */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          9. Termination of Accounts
        </h2>
        <p>
          HOPTERLINK reserves the right to suspend or terminate accounts that
          violate these Terms or engage in misconduct.
        </p>
      </section>

      {/* Section 10: Privacy Policy */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">10. Privacy Policy</h2>
        <p>
          Your privacy matters to us. Please refer to our Privacy Policy for
          details on how we collect, use, and protect your information.
        </p>
      </section>

      {/* Section 11: Changes to Terms */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          11. Changes to Terms
        </h2>
        <p>
          We may update these Terms periodically. Continued use of HOPTERLINK
          after changes signifies your acceptance of the updated Terms.
        </p>
      </section>

      {/* Section 12: Contact Information */}
      <section>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          12. Contact Information
        </h2>
        <p>
          For any questions or concerns about these Terms, contact us at{" "}
          <a
            href="mailto:info@hopterlink.com"
            className="text-blue-600 hover:underline"
          >
            info@hopterlink.com
          </a>
        </p>
      </section>
    </div>
  );
}
