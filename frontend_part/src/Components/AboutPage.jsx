import React from 'react'

function AboutPage() {
    return (
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold mb-6">About Password Manager</h1>
          <p className="text-lg mb-4">
            Welcome to Password Manager, your ultimate solution for secure password management. 
            Our application ensures that your passwords are stored safely and easily accessible 
            whenever you need them.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Secure encryption to protect your passwords</li>
            <li>Easy-to-use interface for quick access</li>
            <li>Generate strong passwords to enhance security</li>
            <li>Organize your passwords with custom categories</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At Password Manager, our mission is to provide a user-friendly and highly secure platform 
            to manage your passwords. We understand the importance of keeping your digital life 
            safe and strive to offer the best tools to achieve that.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            Have questions or need support? Feel free to <a href="mailto:support@passwordsave.com" className="text-blue-500 hover:underline">contact us</a>.
          </p>
        </div>
      );
}

export default AboutPage ;
