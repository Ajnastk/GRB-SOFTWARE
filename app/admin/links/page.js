"use client";

import { useState } from 'react';
import LinkList from '@/component/LinkList';
import AddLinkModal from '@/component/AddLinkModal';
import EditLinkModal from '@/component/EditLinkModal';
import DeleteConfirmModal from '@/component/DeleteLinkModal';
import ViewLinkModal from '@/component/ViewLinkModal';

export default function LinksPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [linkCreated, setLinkCreated] = useState(false);

  const handleAddLink = (link) => {
    setSelectedLink(link);
    setShowAddModal(true);
  };

  const handleEditLink = (link) => {
    setSelectedLink(link);
    setShowEditModal(true);
  };

  const handleDeleteLink = (link) => {
    setSelectedLink(link);
    setShowDeleteModal(true);
  };

  const handleViewLink = (link) => {
    setSelectedLink(link);
    setShowViewModal(true);
  };

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setShowViewModal(false);
    setSelectedLink(null);
    setLinkCreated(true);

  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Link Management</h1>
            <p className="text-gray-600 mt-1">Manage shop links and QR codes</p>
          </div>
          <div className="flex space-x-3">
            {!linkCreated?(
              <button 
              onClick={handleAddLink}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
            > <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Link
              </span>
              </button>
            ):(
              <div></div>
            )}
            
            {/* <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </span>
            </button> */}
            {/* <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filter
              </span>
            </button> */}
          </div>
        </div>
      </div>

      {/* Links List */}
      <LinkList 
        onEdit={handleEditLink}
        onDelete={handleDeleteLink}
        onView={handleViewLink}
        refreshTrigger={refreshTrigger}
        showActions={true}
      />

      {/* Modals */}
      {showAddModal && (
        <AddLinkModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showEditModal && selectedLink && (
        <EditLinkModal 
          link={selectedLink}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showDeleteModal && selectedLink && (
        <DeleteConfirmModal 
          link={selectedLink}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleSuccess}
          type="link"
        />
      )}

      {showViewModal && selectedLink && (
        <ViewLinkModal 
          link={selectedLink}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </div>
  );
}
