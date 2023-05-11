"use client";

import React, { useState, useEffect } from 'react';
import { nip19 } from 'nostr-tools';
import usePublish from '@/hooks/usePublish';
import useStore from '@/store';
import CardContainer from '@/components/CardContainer';
import {useProfileMetadata} from "@/hooks";

const EditProfile = () => {
  const [profile, setProfile] = useState({} as any);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const userData = useStore((state) => state.auth.user.data);
  const myNpub = userData?.publicKey ? nip19.npubEncode(userData?.publicKey) : '';

  const { latestMetadataEvent } = useProfileMetadata(userData?.publicKey || '');
  useEffect(() => {
    if (latestMetadataEvent) {
      try {
        const content = JSON.parse(latestMetadataEvent.content || '{}');
        setProfile(content);
      } catch (error) {
        console.log(error);
      }
    }
  }, [latestMetadataEvent]);

  const publish = usePublish();

  useEffect(() => {
    // Fetch user's profile data and update the state
  }, []);

  const handleProfileAttributeChange = (key: string, value: string) => {
    const updatedProfile = { ...profile, [key]: value };
    setProfile(updatedProfile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save the profile data
    console.log('publish profile', profile);
    const content = JSON.stringify(profile);
    await publish({
      kind: 0,
      content,
      tags: latestMetadataEvent?.tags || [],
    });
  };

  const handleAddField = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFieldName && newFieldValue) {
      handleProfileAttributeChange(newFieldName, newFieldValue);
      setNewFieldName('');
      setNewFieldValue('');
      // Save the profile data
    }
  };

  const renderProfileFields = () => {
    const defaultFields = ['name', 'picture', 'about', 'banner', 'website', 'lud16', 'nip05'];

    return defaultFields.map((field) => {
      const value = profile[field] || '';
      return (
        <p key={field}>
          <label htmlFor={field}>{field}:</label>
          <br />
          <input
            className="input w-full"
            type="text"
            id={field}
            value={value}
            placeholder={field}
            onChange={(e) => handleProfileAttributeChange(field, e.target.value)}
          />
        </p>
      );
    });
  };

  return (
    <CardContainer>
      <div className="prose">
        <form onSubmit={handleSubmit} className="w-full">
          {renderProfileFields()}
          <button type="submit" className="btn btn-primary mt-4">
            Save
          </button>
        </form>
        <h4>Add new field</h4>
        <form onSubmit={(e) => handleAddField(e)}>
          <p>
            <label htmlFor="newFieldName">Field name:</label>
            <br />
            <input
              value={newFieldName}
              type="text"
              id="newFieldName"
              className="input w-full"
              onChange={(e) => setNewFieldName(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="newFieldValue">Field value:</label>
            <br />
            <input
              value={newFieldValue}
              type="text"
              id="newFieldValue"
              className="input"
              onChange={(e) => setNewFieldValue(e.target.value)}
            />
          </p>
          <p>
            <button type="submit" className="btn btn-primary">
              Add new attribute
            </button>
          </p>
        </form>
      </div>

    </CardContainer>);
};

export default EditProfile;