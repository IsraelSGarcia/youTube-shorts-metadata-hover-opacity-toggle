// ==UserScript==
// @name         YouTube Shorts Metadata Hover & Toggle Opacity
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  This Tampermonkey script enhances the user experience on YouTube Shorts by enabling hover effects and providing a keyboard shortcut to toggle metadata visibility. When the user hovers over the metadata panels (such as video information or like/dislike stats), the video brightness is dimmed. Additionally, pressing the 'H' key allows users to toggle the opacity of the metadata, making it easier to focus on the video. The script also works seamlessly with YouTube's infinite scroll feature and handles SPA (Single Page Application) navigation for dynamic content updates.
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Utility: Wait for element with timeout
    function waitForElement(selector, callback, timeout = 5000) {
        const start = Date.now();
        const check = () => {
            const el = document.querySelector(selector);
            if (el) {
                callback(el);
            } else if (Date.now() - start < timeout) {
                setTimeout(check, 200);
            }
        };
        check();
    }

    // Setup hover effects on metadata panels
    function setupHoverEffects(metadataPanel) {
        if (metadataPanel.dataset.handlerAttached === "true") return;
        metadataPanel.dataset.handlerAttached = "true";

        const video = metadataPanel.closest('ytd-reel-video-renderer')?.querySelector('video') ||
                      document.querySelector('video');
        if (!video) return;

        video.style.transition = "filter 0.3s ease";
        metadataPanel.style.transition = "opacity 0.3s ease";
        metadataPanel.style.opacity = "1";

        metadataPanel.addEventListener("mouseenter", () => {
            video.style.filter = "brightness(50%)";
        });
        metadataPanel.addEventListener("mouseleave", () => {
            video.style.filter = "";
        });
    }

    // Add CSS styles to document head
    function addStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            .metadata-hidden .metadata-container,
            .metadata-hidden #info {
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
            
            /* Ensure action container stays visible and in place */
            .metadata-hidden div.action-container.style-scope.ytd-reel-player-overlay-renderer {
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 1000 !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // Toggle metadata visibility
    function toggleMetadataOpacity() {
        const shortsContainer = document.querySelector('#shorts-container');
        if (!shortsContainer) return;
        
        const isHidden = shortsContainer.classList.contains('metadata-hidden');
        
        if (isHidden) {
            shortsContainer.classList.remove('metadata-hidden');
        } else {
            // Before hiding, save positions of action containers
            const actionContainers = document.querySelectorAll(
                "div.action-container.style-scope.ytd-reel-player-overlay-renderer"
            );
            
            actionContainers.forEach(container => {
                // First, ensure the container is visible
                container.style.visibility = "visible";
                container.style.opacity = "1";
            });
            
            shortsContainer.classList.add('metadata-hidden');
        }
    }

    // Key handler for H key
    document.addEventListener("keydown", (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (["input", "textarea", "select"].includes(tag) || e.target.isContentEditable) return;
        if (e.code === "KeyH" && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
            toggleMetadataOpacity();
        }
    });

    // Observe Shorts container for infinite scroll
    let shortsObserver;
    function observeShortsContainer(container) {
        if (shortsObserver) shortsObserver.disconnect();

        shortsObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const panels = node.querySelectorAll(
                            ".metadata-container, ytd-reel-video-renderer #info"
                        );
                        panels.forEach(panel => setupHoverEffects(panel));
                    }
                });
            });
            attachHandlersToAllShorts();
        });

        shortsObserver.observe(container, { childList: true, subtree: true });
    }

    // Attach handlers to existing panels
    function attachHandlersToAllShorts() {
        const panels = document.querySelectorAll(
            "#shorts-inner-container .metadata-container, ytd-reel-video-renderer #info"
        );
        panels.forEach(panel => setupHoverEffects(panel));
    }

    // Handle SPA navigation
    function handleNavigation() {
        if (window.location.pathname.includes('/shorts/')) {
            waitForElement("#shorts-inner-container", (container) => {
                attachHandlersToAllShorts();
                observeShortsContainer(container);
            });
        } else {
            if (shortsObserver) shortsObserver.disconnect();
        }
    }

    // Initial setup
    function initialize() {
        addStyles();
        handleNavigation();
        window.addEventListener("yt-navigate-finish", handleNavigation);
    }

    // Start the script
    initialize();
})();
