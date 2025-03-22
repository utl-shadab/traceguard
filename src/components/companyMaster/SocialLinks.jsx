import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import CustomSelect from "../companyAccess/CompanySelect";

const Socials = ["Facebook", "Instagram", "LinkedIn", "Youtube"];

const SocialLinks = () => {
  const [links, setLinks] = useState([
    { platform: "Facebook", url: "https://www.facebook.com" },
    { platform: "Instagram", url: "https://www.instagram.com" },
    { platform: "LinkedIn", url: "https://in.linkedin.com" },
    { platform: "Youtube", url: "https://www.youtube.com" },
  ]);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });

  const addLink = () => {
    if (newLink.platform && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ platform: "", url: "" });
    }
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full mx-auto p-4 border rounded-lg shadow-md bg-white">
      <div className="flex gap-2 mb-4">
        <CustomSelect
          options={Socials}
          value={newLink.platform}
          onChange={(value) => setNewLink({ ...newLink, platform: value })}
          placeholder="Select Media"
        />
        <input
          type="text"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          placeholder="URL"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addLink}
          className="bg-[#5765F6] text-white px-3 py-2 rounded flex items-center gap-1"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <table className="w-full border-collapse border rounded overflow-hidden">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2 text-left">Social Media</th>
            <th className="p-2 text-left">URL</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{link.platform}</td>
              <td className="p-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {link.url}
                </a>
              </td>
              <td className="p-2 text-center">
                <button onClick={() => removeLink(index)} className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button className="bg-[#5765F6] text-white px-6 py-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default SocialLinks;
